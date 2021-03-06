﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using GrandOakOrders.Data.Entities;
using GrapeCity.ActiveReports;

namespace GrandOakOrders.Reports
{
    public partial class QuoteReport : SectionReport
    {
        private readonly Order _order;
        private readonly List<OrderItem> _items;
        private int _index;

        public QuoteReport(Order order)
        {
            InitializeComponent();

            _items = order.Items
                .Where(i => i.ShowOnInvoice)
                .OrderBy(i => i.SortOrder)
                .ToList();
            DataSource = _items;
            _order = order;
        }

        private void OnReportHeaderFormat(object sender, EventArgs e)
        {
            txtDate.Text = DateTime.Today.ToString("MMM d, yyyy");
            txtInvoiceNumber.Text = _order.Id.ToString("0000");
            txtCustomer.Text = _order.Inquiry.Organization;
            if (!string.IsNullOrWhiteSpace(_order.Inquiry.ContactPerson)) {
                txtCustomer.Text += ("\n" + _order.Inquiry.ContactPerson);
            }
            txtPhoneNumber.Text = _order.Inquiry.Phone;

            txtPersonTakingOrder.Text = _order.Inquiry.CreatedBy;
            txtPickupDate.Text = _order.Inquiry.EventDate.GetValueOrDefault(DateTime.Today).ToString("MMM d, yyyy");
            txtNumberGuests.Text = _order.Inquiry.People.ToString();
        }

        private void OnDetailFormat(object sender, EventArgs e)
        {
            if (_index >= 0 && _index < _items.Count) {
                var item = _items[_index];

                txtQty.Text = item.Quantity.ToString("#,##0.##", CultureInfo.InvariantCulture);
                txtDescription.Text = item.Description;
                txtUnitPrice.Text = item.UnitPrice.ToString("C");
                txtLinePrice.Text = (item.Quantity*item.UnitPrice).ToString("C");
            }
            _index++;
        }

        private void OnReportFooterFormat(object sender, EventArgs e)
        {
            txtTotal.Text = _order.SubTotal.ToString("C");

            if (string.IsNullOrWhiteSpace(_order.Notes)) {
                lblNotes.Visible = txtNotes.Visible = false;
            }
            else {
                lblNotes.Visible = txtNotes.Visible = true;
                txtNotes.Text = _order.Notes;
            }

            if (string.IsNullOrWhiteSpace(_order.AllergyNotes)) {
                txtAllergies.Visible = false;
            }
            else {
                txtAllergies.Visible = true;
                txtAllergies.Text = "ALLERGY ALERT: " + _order.AllergyNotes;
            }
        }
    }
}
