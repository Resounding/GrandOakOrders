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
            this.lblPrintedOn = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.reportHeader = new GrapeCity.ActiveReports.SectionReportModel.ReportHeader();
            this.lblOrganization = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblContactPerson = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblEventDateTime = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblSummary = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtOrganization = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtContactPerson = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtEventDate = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtSummary = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.picLogo = new GrapeCity.ActiveReports.SectionReportModel.Picture();
            this.lblTitle = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblAllergies = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtAllergyNotes = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.lblLocation = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtLocation = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.line2 = new GrapeCity.ActiveReports.SectionReportModel.Line();
            this.lblPickupNotes = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtPickupNotes = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.lblPeople = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtPeople = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.reportFooter = new GrapeCity.ActiveReports.SectionReportModel.ReportFooter();
            this.chkInvoice = new GrapeCity.ActiveReports.SectionReportModel.CheckBox();
            this.chkCash = new GrapeCity.ActiveReports.SectionReportModel.CheckBox();
            this.line3 = new GrapeCity.ActiveReports.SectionReportModel.Line();
            this.label1 = new GrapeCity.ActiveReports.SectionReportModel.Label();
            ((System.ComponentModel.ISupportInitialize)(this.txtItemDescription)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtKitchenNotes)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblItemDescription)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtQuantity)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblQuantity)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblKitchenNotes)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.infoPageNumber)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPrintedOn)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblOrganization)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblContactPerson)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblEventDateTime)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblSummary)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtOrganization)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtContactPerson)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtEventDate)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtSummary)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.picLogo)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblTitle)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblAllergies)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtAllergyNotes)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblLocation)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtLocation)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPickupNotes)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPickupNotes)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPeople)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPeople)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chkInvoice)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chkCash)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.label1)).BeginInit();
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
            this.detail.Height = 1F;
            this.detail.Name = "detail";
            this.detail.Format += new System.EventHandler(this.OnDetailFormat);
            // 
            // txtItemDescription
            // 
            this.txtItemDescription.DataField = "Description";
            this.txtItemDescription.Height = 0.3F;
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
            this.txtKitchenNotes.Height = 0.3F;
            this.txtKitchenNotes.Left = 0F;
            this.txtKitchenNotes.Name = "txtKitchenNotes";
            this.txtKitchenNotes.Style = "font-family: Segoe UI; font-size: 14pt; text-align: left";
            this.txtKitchenNotes.Text = "Kitchen Notes";
            this.txtKitchenNotes.Top = 0.6F;
            this.txtKitchenNotes.Width = 6.5F;
            // 
            // lblItemDescription
            // 
            this.lblItemDescription.Height = 0.3F;
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
            this.txtQuantity.Height = 0.3F;
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
            this.lblQuantity.Height = 0.3F;
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
            this.lblKitchenNotes.Height = 0.3F;
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
            this.lblPrintedOn});
            this.pageFooter.Height = 0.3F;
            this.pageFooter.Name = "pageFooter";
            this.pageFooter.Format += new System.EventHandler(this.OnPageFooterFormat);
            // 
            // infoPageNumber
            // 
            this.infoPageNumber.FormatString = "Page {PageNumber} of {PageCount}";
            this.infoPageNumber.Height = 0.2F;
            this.infoPageNumber.Left = 5F;
            this.infoPageNumber.Name = "infoPageNumber";
            this.infoPageNumber.Style = "font-family: Segoe UI; text-align: right";
            this.infoPageNumber.Top = 0.05F;
            this.infoPageNumber.Width = 1.5F;
            // 
            // lblPrintedOn
            // 
            this.lblPrintedOn.Height = 0.2F;
            this.lblPrintedOn.HyperLink = null;
            this.lblPrintedOn.Left = 0F;
            this.lblPrintedOn.Name = "lblPrintedOn";
            this.lblPrintedOn.Style = "";
            this.lblPrintedOn.Text = "Printed On";
            this.lblPrintedOn.Top = 0.05F;
            this.lblPrintedOn.Width = 4F;
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
            this.txtSummary,
            this.picLogo,
            this.lblTitle,
            this.lblAllergies,
            this.txtAllergyNotes,
            this.lblLocation,
            this.txtLocation,
            this.line2,
            this.lblPickupNotes,
            this.txtPickupNotes,
            this.lblPeople,
            this.txtPeople});
            this.reportHeader.Height = 3.9F;
            this.reportHeader.Name = "reportHeader";
            this.reportHeader.Format += new System.EventHandler(this.OnReportHeaderFormat);
            // 
            // lblOrganization
            // 
            this.lblOrganization.Height = 0.3F;
            this.lblOrganization.HyperLink = null;
            this.lblOrganization.Left = 0.1F;
            this.lblOrganization.Name = "lblOrganization";
            this.lblOrganization.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblOrganization.Text = "Organization:";
            this.lblOrganization.Top = 0.648F;
            this.lblOrganization.Width = 1.75F;
            // 
            // lblContactPerson
            // 
            this.lblContactPerson.Height = 0.3F;
            this.lblContactPerson.HyperLink = null;
            this.lblContactPerson.Left = 0.1F;
            this.lblContactPerson.Name = "lblContactPerson";
            this.lblContactPerson.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblContactPerson.Text = "Contact Person:";
            this.lblContactPerson.Top = 0.998F;
            this.lblContactPerson.Width = 1.75F;
            // 
            // lblEventDateTime
            // 
            this.lblEventDateTime.Height = 0.3F;
            this.lblEventDateTime.HyperLink = null;
            this.lblEventDateTime.Left = 0.1F;
            this.lblEventDateTime.Name = "lblEventDateTime";
            this.lblEventDateTime.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblEventDateTime.Text = "Event Date / Time:";
            this.lblEventDateTime.Top = 1.8F;
            this.lblEventDateTime.Width = 1.75F;
            // 
            // lblSummary
            // 
            this.lblSummary.Height = 0.3F;
            this.lblSummary.HyperLink = null;
            this.lblSummary.Left = 0.1F;
            this.lblSummary.Name = "lblSummary";
            this.lblSummary.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblSummary.Text = "Summary:";
            this.lblSummary.Top = 2.6F;
            this.lblSummary.Width = 1.75F;
            // 
            // txtOrganization
            // 
            this.txtOrganization.DataField = "Inquiry.Organization";
            this.txtOrganization.Height = 0.3F;
            this.txtOrganization.Left = 2F;
            this.txtOrganization.Name = "txtOrganization";
            this.txtOrganization.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtOrganization.Text = "Organization";
            this.txtOrganization.Top = 0.648F;
            this.txtOrganization.Width = 4.5F;
            // 
            // txtContactPerson
            // 
            this.txtContactPerson.DataField = "Inquiry.ContactPerson";
            this.txtContactPerson.Height = 0.3F;
            this.txtContactPerson.Left = 2F;
            this.txtContactPerson.Name = "txtContactPerson";
            this.txtContactPerson.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtContactPerson.Text = "Contact Person";
            this.txtContactPerson.Top = 0.998F;
            this.txtContactPerson.Width = 4.5F;
            // 
            // txtEventDate
            // 
            this.txtEventDate.Height = 0.3F;
            this.txtEventDate.Left = 2F;
            this.txtEventDate.Name = "txtEventDate";
            this.txtEventDate.OutputFormat = resources.GetString("txtEventDate.OutputFormat");
            this.txtEventDate.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.txtEventDate.Text = "Monday, 15 September, 2015 10:00 AM";
            this.txtEventDate.Top = 1.8F;
            this.txtEventDate.Width = 4.5F;
            // 
            // txtSummary
            // 
            this.txtSummary.DataField = "Inquiry.Summary";
            this.txtSummary.Height = 0.3F;
            this.txtSummary.Left = 2F;
            this.txtSummary.Name = "txtSummary";
            this.txtSummary.OutputFormat = resources.GetString("txtSummary.OutputFormat");
            this.txtSummary.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtSummary.Text = "Summary";
            this.txtSummary.Top = 2.6F;
            this.txtSummary.Width = 4.5F;
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
            // lblTitle
            // 
            this.lblTitle.Height = 0.49F;
            this.lblTitle.HyperLink = null;
            this.lblTitle.Left = 0F;
            this.lblTitle.Name = "lblTitle";
            this.lblTitle.Style = "font-family: Segoe UI; font-size: 24pt; font-weight: bold; text-align: center";
            this.lblTitle.Text = "Event Information Sheet";
            this.lblTitle.Top = 0F;
            this.lblTitle.Width = 5.778F;
            // 
            // lblAllergies
            // 
            this.lblAllergies.Height = 0.3F;
            this.lblAllergies.HyperLink = null;
            this.lblAllergies.Left = 0.1F;
            this.lblAllergies.Name = "lblAllergies";
            this.lblAllergies.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblAllergies.Text = "Allergy Notes:";
            this.lblAllergies.Top = 3F;
            this.lblAllergies.Width = 1.75F;
            // 
            // txtAllergyNotes
            // 
            this.txtAllergyNotes.Height = 0.3F;
            this.txtAllergyNotes.Left = 2F;
            this.txtAllergyNotes.Name = "txtAllergyNotes";
            this.txtAllergyNotes.OutputFormat = resources.GetString("txtAllergyNotes.OutputFormat");
            this.txtAllergyNotes.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtAllergyNotes.Text = "Allergy Notes";
            this.txtAllergyNotes.Top = 3F;
            this.txtAllergyNotes.Width = 4.5F;
            // 
            // lblLocation
            // 
            this.lblLocation.Height = 0.3F;
            this.lblLocation.HyperLink = null;
            this.lblLocation.Left = 0.1F;
            this.lblLocation.Name = "lblLocation";
            this.lblLocation.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblLocation.Text = "Location:";
            this.lblLocation.Top = 2.2F;
            this.lblLocation.Width = 1.75F;
            // 
            // txtLocation
            // 
            this.txtLocation.Height = 0.3F;
            this.txtLocation.Left = 2F;
            this.txtLocation.Name = "txtLocation";
            this.txtLocation.OutputFormat = resources.GetString("txtLocation.OutputFormat");
            this.txtLocation.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtLocation.Text = "Location";
            this.txtLocation.Top = 2.2F;
            this.txtLocation.Width = 4.5F;
            // 
            // line2
            // 
            this.line2.Height = 0F;
            this.line2.Left = 0F;
            this.line2.LineWeight = 1F;
            this.line2.Name = "line2";
            this.line2.Top = 3.8F;
            this.line2.Width = 6.5F;
            this.line2.X1 = 0F;
            this.line2.X2 = 6.5F;
            this.line2.Y1 = 3.8F;
            this.line2.Y2 = 3.8F;
            // 
            // lblPickupNotes
            // 
            this.lblPickupNotes.Height = 0.3F;
            this.lblPickupNotes.HyperLink = null;
            this.lblPickupNotes.Left = 0.1F;
            this.lblPickupNotes.Name = "lblPickupNotes";
            this.lblPickupNotes.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblPickupNotes.Text = "Pickup Notes:";
            this.lblPickupNotes.Top = 3.4F;
            this.lblPickupNotes.Width = 1.75F;
            // 
            // txtPickupNotes
            // 
            this.txtPickupNotes.Height = 0.3F;
            this.txtPickupNotes.Left = 2F;
            this.txtPickupNotes.Name = "txtPickupNotes";
            this.txtPickupNotes.OutputFormat = resources.GetString("txtPickupNotes.OutputFormat");
            this.txtPickupNotes.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtPickupNotes.Text = "Pickup Notes";
            this.txtPickupNotes.Top = 3.4F;
            this.txtPickupNotes.Width = 4.5F;
            // 
            // lblPeople
            // 
            this.lblPeople.Height = 0.3F;
            this.lblPeople.HyperLink = null;
            this.lblPeople.Left = 0.1F;
            this.lblPeople.Name = "lblPeople";
            this.lblPeople.Style = "font-family: Segoe UI; font-size: 14pt; font-weight: bold";
            this.lblPeople.Text = "People:";
            this.lblPeople.Top = 1.4F;
            this.lblPeople.Width = 1.75F;
            // 
            // txtPeople
            // 
            this.txtPeople.DataField = "Inquiry.People";
            this.txtPeople.Height = 0.3F;
            this.txtPeople.Left = 2F;
            this.txtPeople.Name = "txtPeople";
            this.txtPeople.Style = "font-family: Segoe UI; font-size: 14pt";
            this.txtPeople.Text = "People";
            this.txtPeople.Top = 1.4F;
            this.txtPeople.Width = 4.5F;
            // 
            // reportFooter
            // 
            this.reportFooter.Controls.AddRange(new GrapeCity.ActiveReports.SectionReportModel.ARControl[] {
            this.chkInvoice,
            this.chkCash,
            this.label1,
            this.line3});
            this.reportFooter.Height = 0.4F;
            this.reportFooter.Name = "reportFooter";
            this.reportFooter.PrintAtBottom = true;
            // 
            // chkInvoice
            // 
            this.chkInvoice.Height = 0.25F;
            this.chkInvoice.Left = 0.1F;
            this.chkInvoice.Name = "chkInvoice";
            this.chkInvoice.Style = "font-family: Segoe UI; font-size: 14pt";
            this.chkInvoice.Text = "  Invoice";
            this.chkInvoice.Top = 0.1F;
            this.chkInvoice.Width = 1.25F;
            // 
            // chkCash
            // 
            this.chkCash.Height = 0.25F;
            this.chkCash.Left = 1.5F;
            this.chkCash.Name = "chkCash";
            this.chkCash.Style = "font-family: Segoe UI; font-size: 14pt";
            this.chkCash.Text = "  Cash";
            this.chkCash.Top = 0.1F;
            this.chkCash.Width = 0.9F;
            // 
            // line3
            // 
            this.line3.Height = 0F;
            this.line3.Left = 3F;
            this.line3.LineWeight = 1F;
            this.line3.Name = "line3";
            this.line3.Top = 0.1F;
            this.line3.Width = 3.5F;
            this.line3.X1 = 3F;
            this.line3.X2 = 6.5F;
            this.line3.Y1 = 0.1F;
            this.line3.Y2 = 0.1F;
            // 
            // label1
            // 
            this.label1.Height = 0.2F;
            this.label1.HyperLink = null;
            this.label1.Left = 3F;
            this.label1.Name = "label1";
            this.label1.Style = "font-family: Segoe UI";
            this.label1.Text = "Staff signoff";
            this.label1.Top = 0.09999999F;
            this.label1.Width = 1F;
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
            this.PrintWidth = 6.802F;
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
            ((System.ComponentModel.ISupportInitialize)(this.lblPrintedOn)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblOrganization)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblContactPerson)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblEventDateTime)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblSummary)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtOrganization)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtContactPerson)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtEventDate)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtSummary)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.picLogo)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblTitle)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblAllergies)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtAllergyNotes)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblLocation)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtLocation)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPickupNotes)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPickupNotes)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPeople)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPeople)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chkInvoice)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chkCash)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.label1)).EndInit();

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
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtSummary;
        private GrapeCity.ActiveReports.SectionReportModel.ReportFooter reportFooter;
        private GrapeCity.ActiveReports.SectionReportModel.ReportInfo infoPageNumber;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtItemDescription;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtKitchenNotes;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblItemDescription;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtQuantity;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblQuantity;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblKitchenNotes;
        private GrapeCity.ActiveReports.SectionReportModel.Line line1;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblTitle;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblAllergies;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtAllergyNotes;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblLocation;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtLocation;
        private GrapeCity.ActiveReports.SectionReportModel.Line line2;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblPickupNotes;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtPickupNotes;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblPeople;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtPeople;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblPrintedOn;
        private GrapeCity.ActiveReports.SectionReportModel.CheckBox chkInvoice;
        private GrapeCity.ActiveReports.SectionReportModel.CheckBox chkCash;
        private GrapeCity.ActiveReports.SectionReportModel.Label label1;
        private GrapeCity.ActiveReports.SectionReportModel.Line line3;
    }
}
