using System;
using System.Linq;
using System.Xml.Serialization;
using GrandOakOrders.Data.Entities;
using GrapeCity.ActiveReports;
using GrapeCity.ActiveReports.Data;
using GrapeCity.ActiveReports.SectionReportModel;

namespace GrandOakOrders.Reports
{
    public partial class KitchenOrderReport : SectionReport
    {
        private Order _order;
        private int index = 0;

        public KitchenOrderReport(Order order)
        {
            InitializeComponent();

            DataSource = order.Items
                .Where(i => i.ShowToKitchen)
                .OrderBy(i => i.SortOrder)
                .ToList();
            _order = order;
        }

        private void OnReportHeaderFormat(object sender, EventArgs e)
        {
            Name = lblTitle.Text;

            txtOrganization.Text = _order.Inquiry.Organization;
            txtContactPerson.Text = _order.Inquiry.ContactPerson;
            if (_order.Inquiry.EventDate.HasValue) {
                txtEventDate.Text = _order.Inquiry.EventDate.Value.ToString("dddd d MMM, yyyy");
            }
            if (_order.Inquiry.EventTime.HasValue) {
                var dateTime = DateTime.Today.Add(_order.Inquiry.EventTime.Value);
                txtEventDate.Text += (" " + dateTime.ToString("h:mm tt"));

                if (!string.IsNullOrEmpty(_order.Inquiry.DeliveryType)) {
                    txtEventDate.Text += _order.Inquiry.DeliveryType;
                }
            }
            txtSummary.Text = _order.Inquiry.Summary;
            txtAllergyNotes.Text = _order.AllergyNotes;
            txtLocation.Text = _order.Inquiry.Location;

            if(!string.IsNullOrEmpty(_order.Inquiry.LocationAddress)) {
                if(!string.IsNullOrEmpty(_order.Inquiry.Location)) {
                    txtLocation.Text += "\n";
                }
                txtLocation.Text += _order.Inquiry.LocationAddress;
            }

            if (string.IsNullOrWhiteSpace(txtLocation.Text)) {
                lblLocation.Height = txtLocation.Height = 0;
                MoveUp(txtSummary);
                MoveUp(lblSummary);
                MoveUp(lblAllergies);
                MoveUp(txtAllergyNotes);
                ShortenHeader();
            }
            if (string.IsNullOrWhiteSpace(_order.Inquiry.Summary)) {
                lblSummary.Height = txtSummary.Height = 0;
                MoveUp(lblAllergies);
                MoveUp(txtAllergyNotes);
                ShortenHeader();
            }
            if (string.IsNullOrWhiteSpace(_order.AllergyNotes)) {
                lblAllergies.Height = txtAllergyNotes.Height = 0;
                ShortenHeader();
            }
        }

        private void OnDetailFormat(object sender, EventArgs e)
        {
            if (index < _order.Items.Count) {
                var item = _order.Items[index];
                if (string.IsNullOrWhiteSpace(item.KitchenNotes)) {
                    var height = detail.Controls["lblKitchenNotes"].Height;

                    detail.Controls["lblKitchenNotes"].Height = detail.Controls["txtKitchenNotes"].Height = 0;
                    detail.Height -= height;

                    var line1 = detail.Controls["line1"] as Line;
                    line1.Y1 -= height;
                    line1.Y2 -= height;
                }
            }
            index++;
        }

        private void ShortenHeader()
        {
            line2.Y1 -= 0.4f;
            line2.Y2 -= 0.4f;
            reportHeader.Height -= 0.4f;
        }

        private void MoveUp(ARControl control)
        {
            control.Location = new System.Drawing.PointF(control.Location.X, control.Location.Y - 0.4f);
        }
    }
}
