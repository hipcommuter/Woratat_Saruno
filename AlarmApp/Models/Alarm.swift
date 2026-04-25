import Foundation

struct Alarm: Identifiable, Codable, Equatable {
    var id: UUID = UUID()
    var time: Date
    var label: String
    var isEnabled: Bool
    var repeatDays: Set<Weekday>
    var sound: AlarmSound
    var snoozeEnabled: Bool

    init(
        id: UUID = UUID(),
        time: Date = Alarm.defaultTime(),
        label: String = "Alarm",
        isEnabled: Bool = true,
        repeatDays: Set<Weekday> = [],
        sound: AlarmSound = .radar,
        snoozeEnabled: Bool = true
    ) {
        self.id = id
        self.time = time
        self.label = label
        self.isEnabled = isEnabled
        self.repeatDays = repeatDays
        self.sound = sound
        self.snoozeEnabled = snoozeEnabled
    }

    var hour: Int {
        Calendar.current.component(.hour, from: time)
    }

    var minute: Int {
        Calendar.current.component(.minute, from: time)
    }

    var formattedTime: String {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        formatter.dateStyle = .none
        return formatter.string(from: time)
    }

    var repeatDescription: String {
        if repeatDays.isEmpty { return "Never" }
        if repeatDays.count == 7 { return "Every day" }
        let weekdays: Set<Weekday> = [.monday, .tuesday, .wednesday, .thursday, .friday]
        if repeatDays == weekdays { return "Weekdays" }
        if repeatDays == [.saturday, .sunday] { return "Weekends" }
        return Weekday.allOrdered
            .filter { repeatDays.contains($0) }
            .map { $0.shortName }
            .joined(separator: " ")
    }

    private static func defaultTime() -> Date {
        let calendar = Calendar.current
        var components = calendar.dateComponents([.year, .month, .day], from: Date())
        components.hour = 7
        components.minute = 0
        return calendar.date(from: components) ?? Date()
    }
}
