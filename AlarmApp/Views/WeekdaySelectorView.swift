import SwiftUI

struct WeekdaySelectorView: View {
    @Binding var selection: Set<Weekday>

    var body: some View {
        List {
            ForEach(Weekday.allOrdered) { day in
                Button {
                    toggle(day)
                } label: {
                    HStack {
                        Text(day.fullName)
                            .foregroundStyle(.primary)
                        Spacer()
                        if selection.contains(day) {
                            Image(systemName: "checkmark")
                                .foregroundStyle(.tint)
                        }
                    }
                }
            }
        }
        .navigationTitle("Repeat")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func toggle(_ day: Weekday) {
        if selection.contains(day) {
            selection.remove(day)
        } else {
            selection.insert(day)
        }
    }
}

#Preview {
    NavigationStack {
        WeekdaySelectorView(selection: .constant([.monday, .wednesday]))
    }
}
