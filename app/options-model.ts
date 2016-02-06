export class Options {
    constructor(
        public notificationsEnabled: boolean = true,
        public notificationText: string = "Enabled",
        public ips: string[] = [],
        public pudgeSounds: boolean = true,
        public pudgeSoundsText: string = "Enabled"
    ) { }
}