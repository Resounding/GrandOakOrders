using System;
using System.Linq;
using GrandOakOrders.Data.Entities;
using GrapeCity.ActiveReports;
using GrapeCity.ActiveReports.SectionReportModel;

namespace GrandOakOrders.Reports
{
    public partial class InvoiceReport : SectionReport
    {
        private readonly Order _order;

        public InvoiceReport(Order order)
        {
            InitializeComponent();

            DataSource = order.Items
                .Where(i => i.ShowOnInvoice)
                .OrderBy(i => i.SortOrder)
                .ToList();
            _order = order;
        }

        private void OnReportHeaderFormat(object sender, EventArgs e)
        {
            txtDate.Text = _order.InvoiceDate.GetValueOrDefault(DateTime.Today).ToString("MMM d, yyyy");
            txtInvoiceNumber.Text = _order.Id.ToString("0000");
            txtCustomer.Text = _order.Inquiry.Organization;
            if (!string.IsNullOrWhiteSpace(_order.Inquiry.ContactPerson)) {
                txtCustomer.Text += ("\n" + _order.Inquiry.ContactPerson);
            }
            txtPhoneNumber.Text = _order.Inquiry.Phone;

            txtPersonTakingOrder.Text = _order.Inquiry.CreatedBy;
            txtPickupDate.Text = _order.Inquiry.EventDate.GetValueOrDefault(DateTime.Today).ToString("MMM d, yyyy");
            txtNumberGuests.Text = _order.Inquiry.People.ToString();
            txtOccasion.Text = _order.Inquiry.Summary;

            var lineHeight = txtOccasion.Top + txtOccasion.Height;
            foreach (var line in reportHeader.Controls.OfType<Line>()) {
                if (Math.Abs(line.X1 - line.X2) < 0.1f) {
                    line.Y2 = lineHeight;
                }
            }
        }
    }
}
