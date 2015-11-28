import moment from 'moment';
export class EmailDelivery {
    constructor(delivery) {
        this.DATE_FORMAT = 'MMM D, YYYY';
        this.TIME_FORMAT = 'h:mm a';
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
    }
    get sentDisplay() {
        if (this.Sent == null)
            return 'Unknown';
        let text = `${moment(this.Sent).format(this.DATE_FORMAT)} at ${moment(this.Sent).format(this.TIME_FORMAT)}.`;
        if (this.BouncedDate) {
            text += ` Bounced on ${moment(this.BouncedDate).format(this.DATE_FORMAT)} at ${moment(this.BouncedDate).format(this.TIME_FORMAT)}.`;
        }
        if (this.DeliveredDate) {
            text += ` Delivered on ${moment(this.DeliveredDate).format(this.DATE_FORMAT)} at ${moment(this.DeliveredDate).format(this.TIME_FORMAT)}.`;
        }
        return text;
    }
}
