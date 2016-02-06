import moment from 'moment';

export class EmailDelivery {
    Id: number;
    From: string;
    To: string;
    Bcc: string;
    Subject: string;
    Message: string;
    OrderId: number;
    Sent: Date;
    SentBy: string;
    DeliveredDate: Date;
    BouncedDate: Date;
    OpenedDate: Date;

    DATE_FORMAT = 'MMM D, YYYY';
    TIME_FORMAT = 'h:mm a';

    constructor(delivery: EmailDelivery) {
        this.Id = delivery.Id;
        this.From = delivery.From;
        this.To = delivery.To;
        this.Bcc = delivery.Bcc;
        this.Subject = delivery.Subject;
        this.Message = delivery.Message;
        this.OrderId = delivery.OrderId;
        this.Sent = delivery.Sent;
        this.SentBy = delivery.SentBy;
        this.DeliveredDate = delivery.DeliveredDate;
        this.BouncedDate = delivery.BouncedDate;
        this.OpenedDate = delivery.OpenedDate;
    }

    get sentDisplay(): string {
        if (this.Sent == null) return 'Unknown';

        let text = `${moment(this.Sent).format(this.DATE_FORMAT)} at ${moment(this.Sent).format(this.TIME_FORMAT)}.`;

        if (this.BouncedDate) {
            text += ` Bounced on ${moment(this.BouncedDate).format(this.DATE_FORMAT)} at ${moment(this.BouncedDate).format(this.TIME_FORMAT)}.`;
        }

        if (this.DeliveredDate) {
            text += ` Delivered on ${moment(this.DeliveredDate).format(this.DATE_FORMAT)} at ${moment(this.DeliveredDate).format(this.TIME_FORMAT)}.`;
        }

        if (this.OpenedDate) {
            text += ` Opened on ${moment(this.OpenedDate).format(this.DATE_FORMAT)} at ${moment(this.OpenedDate).format(this.TIME_FORMAT)}.`;
        } 

        return text;
    }
}