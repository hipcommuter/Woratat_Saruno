import Foundation
import Combine

@MainActor
final class AlarmStore: ObservableObject {
    @Published private(set) var alarms: [Alarm] = []

    private let storageKey = "alarms.v1"
    private let defaults: UserDefaults

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
        load()
    }

    func add(_ alarm: Alarm) async {
        alarms.append(alarm)
        sortAlarms()
        save()
        await NotificationService.shared.schedule(alarm)
    }

    func update(_ alarm: Alarm) async {
        guard let index = alarms.firstIndex(where: { $0.id == alarm.id }) else { return }
        alarms[index] = alarm
        sortAlarms()
        save()
        await NotificationService.shared.cancel(alarm)
        await NotificationService.shared.schedule(alarm)
    }

    func delete(at offsets: IndexSet) async {
        let removed = offsets.map { alarms[$0] }
        alarms.remove(atOffsets: offsets)
        save()
        for alarm in removed {
            await NotificationService.shared.cancel(alarm)
        }
    }

    func toggle(_ alarm: Alarm, isEnabled: Bool) async {
        var updated = alarm
        updated.isEnabled = isEnabled
        await update(updated)
    }

    func rescheduleAll() async {
        await NotificationService.shared.cancelAll()
        for alarm in alarms where alarm.isEnabled {
            await NotificationService.shared.schedule(alarm)
        }
    }

    private func sortAlarms() {
        alarms.sort { lhs, rhs in
            if lhs.hour != rhs.hour { return lhs.hour < rhs.hour }
            return lhs.minute < rhs.minute
        }
    }

    private func load() {
        guard let data = defaults.data(forKey: storageKey) else { return }
        if let decoded = try? JSONDecoder().decode([Alarm].self, from: data) {
            alarms = decoded
            sortAlarms()
        }
    }

    private func save() {
        guard let data = try? JSONEncoder().encode(alarms) else { return }
        defaults.set(data, forKey: storageKey)
    }
}
