using System;
using System.IO;
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

            var serializer = new XmlSerializer(typeof(Order));
            var sw = new StringWriter();
            serializer.Serialize(sw, order);
            var xml = sw.ToString();
            var dataSource = new XMLDataSource();
            dataSource.FileURL = null;
            dataSource.RecordsetPattern = "//Order/Items/OrderItem";
            dataSource.LoadXML(xml);
            DataSource = dataSource;

            _order = order;
            //DataSource = _order.Items;
        }

        private void OnReportHeaderFormat(object sender, System.EventArgs e)
        {
            txtOrganization.Text = _order.Inquiry.Organization;
            txtContactPerson.Text = _order.Inquiry.ContactPerson;
            if (_order.Inquiry.EventDate.HasValue) {
                txtEventDate.Text = _order.Inquiry.EventDate.Value.ToString("dddd d MMMM, yyyy");
            }
            if (_order.Inquiry.EventTime.HasValue) {
                var dateTime = DateTime.Today.Add(_order.Inquiry.EventTime.Value);
                txtEventTime.Text = dateTime.ToString("h:mm tt");
            }
            txtSummary.Text = _order.Inquiry.Summary;
            txtDescription.Text = _order.Inquiry.Description;
            txtAllergyNotes.Text = _order.AllergyNotes;
        }        
    }
}
