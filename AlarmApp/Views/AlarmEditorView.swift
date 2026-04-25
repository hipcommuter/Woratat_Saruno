import SwiftUI

struct AlarmEditorView: View {
    enum Mode {
        case create
        case edit(Alarm)
    }

    let mode: Mode
    let onSave: (Alarm) -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var alarm: Alarm

    init(mode: Mode, onSave: @escaping (Alarm) -> Void) {
        self.mode = mode
        self.onSave = onSave
        switch mode {
        case .create:
            _alarm = State(initialValue: Alarm())
        case .edit(let existing):
            _alarm = State(initialValue: existing)
        }
    }

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    DatePicker(
                        "Time",
                        selection: $alarm.time,
                        displayedComponents: .hourAndMinute
                    )
                    .datePickerStyle(.wheel)
                    .labelsHidden()
                    .frame(maxWidth: .infinity)
                }

                Section {
                    NavigationLink {
                        WeekdaySelectorView(selection: $alarm.repeatDays)
                    } label: {
                        LabeledContent("Repeat", value: alarm.repeatDescription)
                    }

                    HStack {
                        Text("Label")
                        Spacer()
                        TextField("Alarm", text: $alarm.label)
                            .multilineTextAlignment(.trailing)
                            .foregroundStyle(.secondary)
                    }

                    Picker("Sound", selection: $alarm.sound) {
                        ForEach(AlarmSound.allCases) { sound in
                            Text(sound.displayName).tag(sound)
                        }
                    }

                    Toggle("Snooze", isOn: $alarm.snoozeEnabled)
                }

                if case .edit = mode {
                    Section {
                        Toggle("Enabled", isOn: $alarm.isEnabled)
                    }
                }
            }
            .navigationTitle(title)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        onSave(alarm)
                        dismiss()
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private var title: String {
        switch mode {
        case .create: return "Add Alarm"
        case .edit: return "Edit Alarm"
        }
    }
}

#Preview {
    AlarmEditorView(mode: .create) { _ in }
}
