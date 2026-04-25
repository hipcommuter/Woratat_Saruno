# Alarm App

A simple SwiftUI iPhone alarm app built with the iOS `UserNotifications` framework. It supports creating, editing, deleting, enabling/disabling, and repeating alarms with snooze and selectable sounds.

## Features

- **Add / edit / delete alarms** with a familiar wheel-style time picker.
- **Repeat schedule** for any combination of weekdays (the app understands "Weekdays", "Weekends", and "Every day" presets).
- **Snooze** action attached to alarm notifications (9-minute snooze).
- **Per-alarm label** and sound selection.
- **Persistence** via `UserDefaults` (JSON-encoded `[Alarm]`).
- **Local notifications** scheduled with `UNCalendarNotificationTrigger`.

## Project layout

```
AlarmApp/
├── AlarmAppApp.swift            # App entry point, environment setup
├── Models/
│   ├── Alarm.swift              # Alarm value type
│   ├── AlarmSound.swift         # Available sounds
│   └── Weekday.swift            # Weekday enum + helpers
├── Stores/
│   └── AlarmStore.swift         # ObservableObject + persistence
├── Services/
│   └── NotificationService.swift # Authorization + scheduling
├── Views/
│   ├── ContentView.swift        # Alarm list
│   ├── AlarmRowView.swift       # Single alarm row
│   ├── AlarmEditorView.swift    # Add/edit form
│   └── WeekdaySelectorView.swift
└── Resources/
    ├── Info.plist
    └── Assets.xcassets/
```

## Running it

1. Open Xcode and create a new **iOS App** project (Interface: SwiftUI, Language: Swift). Name it `AlarmApp`.
2. Replace the generated `AlarmApp` group on disk with the contents of the `AlarmApp/` folder in this repo (or drag the folders in and choose **Create groups**).
3. In **Signing & Capabilities**, select your team and a unique bundle identifier.
4. Build and run on an iPhone simulator (iOS 17+) or a real device. Grant notification permission when prompted.

## Notes

- iOS only delivers local notifications when the app is backgrounded or the device is locked, so test by sending the simulator/device to the home screen before the trigger time.
- The default alarm sounds (`radar.caf`, etc.) need to be added to the bundle if you want unique tones; otherwise iOS falls back to the default notification sound.
- For true persistent ringing past 30 seconds you would need an `AVAudioPlayer` running in the `audio` background mode (the `Info.plist` already declares the capability) — wire this up if you want the alarm to keep ringing until dismissed.
