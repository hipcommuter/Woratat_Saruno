import Foundation
import UserNotifications

final class NotificationService {
    static let shared = NotificationService()

    private let center = UNUserNotificationCenter.current()

    private init() {}

    func requestAuthorization() async {
        do {
            try await center.requestAuthorization(options: [.alert, .sound, .badge])
        } catch {
            print("Notification authorization error: \(error)")
        }
    }

    func schedule(_ alarm: Alarm) async {
        guard alarm.isEnabled else { return }

        let content = UNMutableNotificationContent()
        content.title = alarm.label.isEmpty ? "Alarm" : alarm.label
        content.body = "It's \(alarm.formattedTime)"
        content.sound = UNNotificationSound(named: UNNotificationSoundName(alarm.sound.fileName))
        content.categoryIdentifier = alarm.snoozeEnabled ? "ALARM_SNOOZE" : "ALARM"
        content.userInfo = ["alarmID": alarm.id.uuidString]

        registerCategoriesIfNeeded()

        if alarm.repeatDays.isEmpty {
            let identifier = identifier(for: alarm)
            let trigger = oneShotTrigger(for: alarm)
            let request = UNNotificationRequest(identifier: identifier, content: content, trigger: trigger)
            try? await center.add(request)
        } else {
            for weekday in alarm.repeatDays {
                let identifier = identifier(for: alarm, weekday: weekday)
                let trigger = repeatingTrigger(for: alarm, weekday: weekday)
                let request = UNNotificationRequest(identifier: identifier, content: content, trigger: trigger)
                try? await center.add(request)
            }
        }
    }

    func cancel(_ alarm: Alarm) async {
        let identifiers = allIdentifiers(for: alarm)
        center.removePendingNotificationRequests(withIdentifiers: identifiers)
    }

    func cancelAll() async {
        center.removeAllPendingNotificationRequests()
    }

    private func identifier(for alarm: Alarm, weekday: Weekday? = nil) -> String {
        if let weekday {
            return "alarm.\(alarm.id.uuidString).\(weekday.rawValue)"
        }
        return "alarm.\(alarm.id.uuidString)"
    }

    private func allIdentifiers(for alarm: Alarm) -> [String] {
        var ids = [identifier(for: alarm)]
        for weekday in Weekday.allCases {
            ids.append(identifier(for: alarm, weekday: weekday))
        }
        return ids
    }

    private func oneShotTrigger(for alarm: Alarm) -> UNCalendarNotificationTrigger {
        var components = DateComponents()
        components.hour = alarm.hour
        components.minute = alarm.minute
        return UNCalendarNotificationTrigger(dateMatching: components, repeats: false)
    }

    private func repeatingTrigger(for alarm: Alarm, weekday: Weekday) -> UNCalendarNotificationTrigger {
        var components = DateComponents()
        components.hour = alarm.hour
        components.minute = alarm.minute
        components.weekday = weekday.rawValue
        return UNCalendarNotificationTrigger(dateMatching: components, repeats: true)
    }

    private var categoriesRegistered = false

    private func registerCategoriesIfNeeded() {
        guard !categoriesRegistered else { return }
        categoriesRegistered = true

        let snoozeAction = UNNotificationAction(
            identifier: "SNOOZE_ACTION",
            title: "Snooze",
            options: []
        )
        let stopAction = UNNotificationAction(
            identifier: "STOP_ACTION",
            title: "Stop",
            options: [.destructive]
        )

        let snoozeCategory = UNNotificationCategory(
            identifier: "ALARM_SNOOZE",
            actions: [snoozeAction, stopAction],
            intentIdentifiers: [],
            options: []
        )
        let plainCategory = UNNotificationCategory(
            identifier: "ALARM",
            actions: [stopAction],
            intentIdentifiers: [],
            options: []
        )

        center.setNotificationCategories([snoozeCategory, plainCategory])
    }
}

final class NotificationDelegate: NSObject, UNUserNotificationCenterDelegate {
    static let shared = NotificationDelegate()

    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification,
        withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
    ) {
        completionHandler([.banner, .sound, .list])
    }

    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Void
    ) {
        if response.actionIdentifier == "SNOOZE_ACTION" {
            scheduleSnooze(for: response.notification)
        }
        completionHandler()
    }

    private func scheduleSnooze(for notification: UNNotification) {
        let content = notification.request.content.mutableCopy() as? UNMutableNotificationContent
        guard let content else { return }

        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 9 * 60, repeats: false)
        let request = UNNotificationRequest(
            identifier: "snooze.\(UUID().uuidString)",
            content: content,
            trigger: trigger
        )
        UNUserNotificationCenter.current().add(request)
    }
}
