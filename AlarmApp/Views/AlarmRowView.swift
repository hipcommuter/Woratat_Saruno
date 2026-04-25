import SwiftUI

struct AlarmRowView: View {
    let alarm: Alarm
    let onToggle: (Bool) -> Void

    var body: some View {
        HStack(alignment: .center, spacing: 16) {
            VStack(alignment: .leading, spacing: 4) {
                Text(alarm.formattedTime)
                    .font(.system(size: 44, weight: .light, design: .rounded))
                    .foregroundStyle(alarm.isEnabled ? .primary : .secondary)

                HStack(spacing: 6) {
                    Text(alarm.label)
                    Text("·")
                    Text(alarm.repeatDescription)
                }
                .font(.subheadline)
                .foregroundStyle(.secondary)
            }
            Spacer()
            Toggle("", isOn: Binding(
                get: { alarm.isEnabled },
                set: { onToggle($0) }
            ))
            .labelsHidden()
        }
        .padding(.vertical, 8)
    }
}

#Preview {
    AlarmRowView(
        alarm: Alarm(label: "Wake up", repeatDays: [.monday, .tuesday, .wednesday, .thursday, .friday]),
        onToggle: { _ in }
    )
    .padding()
}
