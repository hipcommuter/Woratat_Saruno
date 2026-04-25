import SwiftUI
import UserNotifications

@main
struct AlarmAppApp: App {
    @StateObject private var store = AlarmStore()

    init() {
        UNUserNotificationCenter.current().delegate = NotificationDelegate.shared
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(store)
                .task {
                    await NotificationService.shared.requestAuthorization()
                    await store.rescheduleAll()
                }
        }
    }
}
