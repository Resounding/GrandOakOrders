export class EmailDelivery {
    constructor(delivery) {
        this.Id = delivery.Id;
        this.From = delivery.From;
        this.To = delivery.To;
        this.Bcc = delivery.Bcc;
        this.Subject = delivery.Subject;
        this.Message = delivery.Message;
        this.OrderId = delivery.OrderId;
        this.Sent = delivery.Sent;
        this.SentBy = delivery.SentBy;
    }
    get sentDisplay() {
        if (this.Sent == null)
            return 'Unknown';
        return moment(this.Sent).format('MMM D, YYYY') +
            ' at ' + moment(this.Sent).format('h:mm a');
    }
}
