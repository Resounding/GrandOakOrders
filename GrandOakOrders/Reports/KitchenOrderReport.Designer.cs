namespace GrandOakOrders.Reports
{
    /// <summary>
    /// Summary description for KitchenOrderReport.
    /// </summary>
    partial class KitchenOrderReport
    {
        private GrapeCity.ActiveReports.SectionReportModel.PageHeader pageHeader;
        private GrapeCity.ActiveReports.SectionReportModel.Detail detail;
        private GrapeCity.ActiveReports.SectionReportModel.PageFooter pageFooter;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        protected override void Dispose(bool disposing)
        {
            if (disposing) {
            }
            base.Dispose(disposing);
        }

        #region ActiveReport Designer generated code
        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(KitchenOrderReport));
            this.pageHeader = new GrapeCity.ActiveReports.SectionReportModel.PageHeader();
            this.detail = new GrapeCity.ActiveReports.SectionReportModel.Detail();
            this.txtItemDescription = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtKitchenNotes = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.lblItemDescription = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtQuantity = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.lblQuantity = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblKitchenNotes = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.line1 = new GrapeCity.ActiveReports.SectionReportModel.Line();
            this.pageFooter = new GrapeCity.ActiveReports.SectionReportModel.PageFooter();
            this.infoPageNumber = new GrapeCity.ActiveReports.SectionReportModel.ReportInfo();
            this.infoPrintedDateTime = new GrapeCity.ActiveReports.SectionReportModel.ReportInfo();
            this.reportHeader = new GrapeCity.ActiveReports.SectionReportModel.ReportHeader();
            this.lblOrganization = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblContactPerson = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblEventDateTime = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblSummary = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtOrganization = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtContactPerson = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtEventDate = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtEventTime = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtSummary = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.lblDescription = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtDescription = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.picLogo = new GrapeCity.ActiveReports.SectionReportModel.Picture();
            this.line2 = new GrapeCity.ActiveReports.SectionReportModel.Line();
            this.lblTitle = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblAllergies = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtAllergyNotes = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.reportFooter = new GrapeCity.ActiveReports.SectionReportModel.ReportFooter();
            ((System.ComponentModel.ISupportInitialize)(this.txtItemDescription)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtKitchenNotes)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblItemDescription)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtQuantity)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblQuantity)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblKitchenNotes)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.infoPageNumber)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.infoPrintedDateTime)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblOrganization)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblContactPerson)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblEventDateTime)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblSummary)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtOrganization)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtContactPerson)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtEventDate)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtEventTime)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtSummary)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblDescription)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtDescription)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.picLogo)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblTitle)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblAllergies)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtAllergyNotes)).BeginInit();
            // 
            // pageHeader
            // 
            this.pageHeader.Height = 0F;
            this.pageHeader.Name = "pageHeader";
            // 
            // detail
            // 
            this.detail.Controls.AddRange(new GrapeCity.ActiveReports.SectionReportModel.ARControl[] {
            this.txtItemDescription,
            this.txtKitchenNotes,
            this.lblItemDescription,
            this.txtQuantity,
            this.lblQuantity,
            this.lblKitchenNotes,
            this.line1});
            this.detail.Height = 0.8770834F;
            this.detail.Name = "detail";
            this.detail.Format += new System.EventHandler(this.OnDetailFormat);
            // 
            // txtItemDescription
            // 
            this.txtItemDescription.DataField = "Description";
            this.txtItemDescription.Height = 0.25F;
            this.txtItemDescription.Left = 1F;
            this.txtItemDescription.Name = "txtItemDescription";
            this.txtItemDescription.Style = "font-family: Segoe UI; font-size: 14pt; text-align: left";
            this.txtItemDescription.Text = "Description";
            this.txtItemDescription.Top = 0.1F;
            this.txtItemDescription.Width = 3F;
            // 
            // txtKitchenNotes
            // 
            this.txtKitchenNotes.DataField = "KitchenNotes";
            this.txtKitchenNotes.Height = 0.25F;
            this.txtKitchenNotes.Left = 0F;
            this.txtKitchenNotes.Name = "txtKitchenNotes";
            this.txtKitchenNotes.Style = "font-family: Segoe UI; font-size: 14pt; text-align: left";
            this.txtKitchenNotes.Text = "Kitchen Notes";
            this.txtKitchenNotes.Top = 0.55F;
            this.txtKitchenNotes.Width = 6.5F;
            // 
            // lblItemDescription
            // 
            this.lblItemDescription.Height = 0.25F;
            this.lblItemDescription.HyperLink = null;
            this.lblItemDescription.Left = 0F;
            this.lblItemDescription.Name = "lblItemDescription";
            this.lblItemDescription.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblItemDescription.Text = "Item:";
            this.lblItemDescription.Top = 0.1F;
            this.lblItemDescription.Width = 1F;
            // 
            // txtQuantity
            // 
            this.txtQuantity.DataField = "Quantity";
            this.txtQuantity.Height = 0.25F;
            this.txtQuantity.Left = 5.5F;
            this.txtQuantity.Name = "txtQuantity";
            this.txtQuantity.OutputFormat = resources.GetString("txtQuantity.OutputFormat");
            this.txtQuantity.Style = "font-family: Segoe UI; font-size: 14pt; text-align: right";
            this.txtQuantity.Text = "Quantity";
            this.txtQuantity.Top = 0.09999999F;
            this.txtQuantity.Width = 1F;
            // 
            // lblQuantity
            // 
            this.lblQuantity.Height = 0.25F;
            this.lblQuantity.HyperLink = null;
            this.lblQuantity.Left = 4.5F;
            this.lblQuantity.Name = "lblQuantity";
            this.lblQuantity.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblQuantity.Text = "Quantity:";
            this.lblQuantity.Top = 0.09999999F;
            this.lblQuantity.Width = 1F;
            // 
            // lblKitchenNotes
            // 
            this.lblKitchenNotes.Height = 0.25F;
            this.lblKitchenNotes.HyperLink = null;
            this.lblKitchenNotes.Left = 0F;
            this.lblKitchenNotes.Name = "lblKitchenNotes";
            this.lblKitchenNotes.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblKitchenNotes.Text = "Notes:";
            this.lblKitchenNotes.Top = 0.35F;
            this.lblKitchenNotes.Width = 1F;
            // 
            // line1
            // 
            this.line1.Height = 0F;
            this.line1.Left = 0F;
            this.line1.LineWeight = 1F;
            this.line1.Name = "line1";
            this.line1.Top = 0.9F;
            this.line1.Width = 6.5F;
            this.line1.X1 = 0F;
            this.line1.X2 = 6.5F;
            this.line1.Y1 = 0.9F;
            this.line1.Y2 = 0.9F;
            // 
            // pageFooter
            // 
            this.pageFooter.Controls.AddRange(new GrapeCity.ActiveReports.SectionReportModel.ARControl[] {
            this.infoPageNumber,
            this.infoPrintedDateTime});
            this.pageFooter.Name = "pageFooter";
            // 
            // infoPageNumber
            // 
            this.infoPageNumber.FormatString = "Page {PageNumber} of {PageCount}";
            this.infoPageNumber.Height = 0.2F;
            this.infoPageNumber.Left = 5F;
            this.infoPageNumber.Name = "infoPageNumber";
            this.infoPageNumber.Style = "font-family: Segoe UI; text-align: right";
            this.infoPageNumber.Top = 0F;
            this.infoPageNumber.Width = 1.5F;
            // 
            // infoPrintedDateTime
            // 
            this.infoPrintedDateTime.FormatString = "Printed on: {RunDateTime:dddd d MMMM, yyyy} at {RunDateTime:h:mm tt}";
            this.infoPrintedDateTime.Height = 0.2F;
            this.infoPrintedDateTime.Left = 0F;
            this.infoPrintedDateTime.Name = "infoPrintedDateTime";
            this.infoPrintedDateTime.Style = "font-family: Segoe UI";
            this.infoPrintedDateTime.Top = 0F;
            this.infoPrintedDateTime.Width = 4.01F;
            // 
            // reportHeader
            // 
            this.reportHeader.Controls.AddRange(new GrapeCity.ActiveReports.SectionReportModel.ARControl[] {
            this.lblOrganization,
            this.lblContactPerson,
            this.lblEventDateTime,
            this.lblSummary,
            this.txtOrganization,
            this.txtContactPerson,
            this.txtEventDate,
            this.txtEventTime,
            this.txtSummary,
            this.lblDescription,
            this.txtDescription,
            this.picLogo,
            this.line2,
            this.lblTitle,
            this.lblAllergies,
            this.txtAllergyNotes});
            this.reportHeader.Height = 2.913195F;
            this.reportHeader.Name = "reportHeader";
            this.reportHeader.Format += new System.EventHandler(this.OnReportHeaderFormat);
            // 
            // lblOrganization
            // 
            this.lblOrganization.Height = 0.25F;
            this.lblOrganization.HyperLink = null;
            this.lblOrganization.Left = 0.25F;
            this.lblOrganization.Name = "lblOrganization";
            this.lblOrganization.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblOrganization.Text = "Organization:";
            this.lblOrganization.Top = 0.55F;
            this.lblOrganization.Width = 1.75F;
            // 
            // lblContactPerson
            // 
            this.lblContactPerson.Height = 0.25F;
            this.lblContactPerson.HyperLink = null;
            this.lblContactPerson.Left = 0.25F;
            this.lblContactPerson.Name = "lblContactPerson";
            this.lblContactPerson.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblContactPerson.Text = "Contact Person:";
            this.lblContactPerson.Top = 0.9F;
            this.lblContactPerson.Width = 1.75F;
            // 
            // lblEventDateTime
            // 
            this.lblEventDateTime.Height = 0.25F;
            this.lblEventDateTime.HyperLink = null;
            this.lblEventDateTime.Left = 0.25F;
            this.lblEventDateTime.Name = "lblEventDateTime";
            this.lblEventDateTime.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblEventDateTime.Text = "Event Date / Time:";
            this.lblEventDateTime.Top = 1.25F;
            this.lblEventDateTime.Width = 1.75F;
            // 
            // lblSummary
            // 
            this.lblSummary.Height = 0.25F;
            this.lblSummary.HyperLink = null;
            this.lblSummary.Left = 0.25F;
            this.lblSummary.Name = "lblSummary";
            this.lblSummary.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblSummary.Text = "Summary:";
            this.lblSummary.Top = 1.75F;
            this.lblSummary.Width = 1.75F;
            // 
            // txtOrganization
            // 
            this.txtOrganization.DataField = "Inquiry.Organization";
            this.txtOrganization.Height = 0.25F;
            this.txtOrganization.Left = 2F;
            this.txtOrganization.Name = "txtOrganization";
            this.txtOrganization.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtOrganization.Text = "Organization";
            this.txtOrganization.Top = 0.55F;
            this.txtOrganization.Width = 3F;
            // 
            // txtContactPerson
            // 
            this.txtContactPerson.DataField = "Inquiry.ContactPerson";
            this.txtContactPerson.Height = 0.25F;
            this.txtContactPerson.Left = 2F;
            this.txtContactPerson.Name = "txtContactPerson";
            this.txtContactPerson.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtContactPerson.Text = "Contact Person";
            this.txtContactPerson.Top = 0.9F;
            this.txtContactPerson.Width = 3F;
            // 
            // txtEventDate
            // 
            this.txtEventDate.DataField = "Inquiry.EventDate";
            this.txtEventDate.Height = 0.25F;
            this.txtEventDate.Left = 2F;
            this.txtEventDate.Name = "txtEventDate";
            this.txtEventDate.OutputFormat = resources.GetString("txtEventDate.OutputFormat");
            this.txtEventDate.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtEventDate.Text = "Monday, 15 September, 2015";
            this.txtEventDate.Top = 1.25F;
            this.txtEventDate.Width = 3F;
            // 
            // txtEventTime
            // 
            this.txtEventTime.DataField = "Inquiry.EventTime";
            this.txtEventTime.Height = 0.25F;
            this.txtEventTime.Left = 2F;
            this.txtEventTime.Name = "txtEventTime";
            this.txtEventTime.OutputFormat = resources.GetString("txtEventTime.OutputFormat");
            this.txtEventTime.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtEventTime.Text = "10:00 AM";
            this.txtEventTime.Top = 1.5F;
            this.txtEventTime.Width = 3F;
            // 
            // txtSummary
            // 
            this.txtSummary.DataField = "Inquiry.Summary";
            this.txtSummary.Height = 0.25F;
            this.txtSummary.Left = 2F;
            this.txtSummary.Name = "txtSummary";
            this.txtSummary.OutputFormat = resources.GetString("txtSummary.OutputFormat");
            this.txtSummary.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtSummary.Text = "Summary";
            this.txtSummary.Top = 1.75F;
            this.txtSummary.Width = 4.5F;
            // 
            // lblDescription
            // 
            this.lblDescription.Height = 0.25F;
            this.lblDescription.HyperLink = null;
            this.lblDescription.Left = 0.25F;
            this.lblDescription.Name = "lblDescription";
            this.lblDescription.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblDescription.Text = "Description:";
            this.lblDescription.Top = 2.1F;
            this.lblDescription.Width = 1.75F;
            // 
            // txtDescription
            // 
            this.txtDescription.DataField = "Inquiry.Description";
            this.txtDescription.Height = 0.25F;
            this.txtDescription.Left = 2F;
            this.txtDescription.Name = "txtDescription";
            this.txtDescription.OutputFormat = resources.GetString("txtDescription.OutputFormat");
            this.txtDescription.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtDescription.Text = "Description";
            this.txtDescription.Top = 2.1F;
            this.txtDescription.Width = 4.5F;
            // 
            // picLogo
            // 
            this.picLogo.Height = 0.6485F;
            this.picLogo.HyperLink = null;
            this.picLogo.ImageData = ((System.IO.Stream)(resources.GetObject("picLogo.ImageData")));
            this.picLogo.Left = 5.778F;
            this.picLogo.Name = "picLogo";
            this.picLogo.SizeMode = GrapeCity.ActiveReports.SectionReportModel.SizeModes.Zoom;
            this.picLogo.Top = 0F;
            this.picLogo.Width = 0.722F;
            // 
            // line2
            // 
            this.line2.Height = 0F;
            this.line2.Left = 0F;
            this.line2.LineWeight = 1F;
            this.line2.Name = "line2";
            this.line2.Top = 2.8F;
            this.line2.Width = 6.5F;
            this.line2.X1 = 0F;
            this.line2.X2 = 6.5F;
            this.line2.Y1 = 2.8F;
            this.line2.Y2 = 2.8F;
            // 
            // lblTitle
            // 
            this.lblTitle.Height = 0.344F;
            this.lblTitle.HyperLink = null;
            this.lblTitle.Left = 0F;
            this.lblTitle.Name = "lblTitle";
            this.lblTitle.Style = "font-family: Segoe UI; font-size: 16pt; font-weight: bold; text-align: center";
            this.lblTitle.Text = "Grand Oak Culinary Order Sheet";
            this.lblTitle.Top = 0F;
            this.lblTitle.Width = 5.778F;
            // 
            // lblAllergies
            // 
            this.lblAllergies.Height = 0.25F;
            this.lblAllergies.HyperLink = null;
            this.lblAllergies.Left = 0.25F;
            this.lblAllergies.Name = "lblAllergies";
            this.lblAllergies.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblAllergies.Text = "Allergy Notes:";
            this.lblAllergies.Top = 2.45F;
            this.lblAllergies.Width = 1.75F;
            // 
            // txtAllergyNotes
            // 
            this.txtAllergyNotes.Height = 0.25F;
            this.txtAllergyNotes.Left = 1.875F;
            this.txtAllergyNotes.Name = "txtAllergyNotes";
            this.txtAllergyNotes.OutputFormat = resources.GetString("txtAllergyNotes.OutputFormat");
            this.txtAllergyNotes.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtAllergyNotes.Text = "Allergy Notes";
            this.txtAllergyNotes.Top = 2.45F;
            this.txtAllergyNotes.Width = 4.5F;
            // 
            // reportFooter
            // 
            this.reportFooter.Height = 0F;
            this.reportFooter.Name = "reportFooter";
            // 
            // KitchenOrderReport
            // 
            this.PageSettings.Margins.Bottom = 0.5F;
            this.MasterReport = false;
            this.PageSettings.Margins.Left = 0.5F;
            this.PageSettings.Margins.Right = 0.5F;
            this.PageSettings.Margins.Top = 0.5F;
            this.PageSettings.PaperHeight = 11F;
            this.PageSettings.PaperWidth = 8.5F;
            this.Sections.Add(this.reportHeader);
            this.Sections.Add(this.pageHeader);
            this.Sections.Add(this.detail);
            this.Sections.Add(this.pageFooter);
            this.Sections.Add(this.reportFooter);
            this.StyleSheet.Add(new DDCssLib.StyleSheetRule("font-family: Arial; font-style: normal; text-decoration: none; font-weight: norma" +
            "l; font-size: 10pt; color: Black", "Normal"));
            this.StyleSheet.Add(new DDCssLib.StyleSheetRule("font-size: 16pt; font-weight: bold", "Heading1", "Normal"));
            this.StyleSheet.Add(new DDCssLib.StyleSheetRule("font-family: Times New Roman; font-size: 14pt; font-weight: bold; font-style: ita" +
            "lic", "Heading2", "Normal"));
            this.StyleSheet.Add(new DDCssLib.StyleSheetRule("font-size: 13pt; font-weight: bold", "Heading3", "Normal"));
            ((System.ComponentModel.ISupportInitialize)(this.txtItemDescription)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtKitchenNotes)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblItemDescription)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtQuantity)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblQuantity)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblKitchenNotes)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.infoPageNumber)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.infoPrintedDateTime)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblOrganization)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblContactPerson)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblEventDateTime)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblSummary)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtOrganization)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtContactPerson)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtEventDate)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtEventTime)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtSummary)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblDescription)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtDescription)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.picLogo)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblTitle)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblAllergies)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtAllergyNotes)).EndInit();

        }
        #endregion

        private GrapeCity.ActiveReports.SectionReportModel.ReportHeader reportHeader;
        private GrapeCity.ActiveReports.SectionReportModel.Picture picLogo;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblOrganization;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblContactPerson;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblEventDateTime;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblSummary;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtOrganization;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtContactPerson;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtEventDate;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtEventTime;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtSummary;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblDescription;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtDescription;
        private GrapeCity.ActiveReports.SectionReportModel.ReportFooter reportFooter;
        private GrapeCity.ActiveReports.SectionReportModel.ReportInfo infoPageNumber;
        private GrapeCity.ActiveReports.SectionReportModel.ReportInfo infoPrintedDateTime;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtItemDescription;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtKitchenNotes;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblItemDescription;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtQuantity;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblQuantity;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblKitchenNotes;
        private GrapeCity.ActiveReports.SectionReportModel.Line line1;
        private GrapeCity.ActiveReports.SectionReportModel.Line line2;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblTitle;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblAllergies;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtAllergyNotes;
    }
}
