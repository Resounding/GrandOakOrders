namespace GrandOakOrders.Reports
{
    /// <summary>
    /// Summary description for InvoiceReport.
    /// </summary>
    partial class InvoiceReport
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(InvoiceReport));
            this.pageHeader = new GrapeCity.ActiveReports.SectionReportModel.PageHeader();
            this.detail = new GrapeCity.ActiveReports.SectionReportModel.Detail();
            this.pageFooter = new GrapeCity.ActiveReports.SectionReportModel.PageFooter();
            this.reportHeader = new GrapeCity.ActiveReports.SectionReportModel.ReportHeader();
            this.reportFooter1 = new GrapeCity.ActiveReports.SectionReportModel.ReportFooter();
            this.picLogo = new GrapeCity.ActiveReports.SectionReportModel.Picture();
            this.lblTitle = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtDate = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtInvoiceNumber = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.label1 = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblInvoiceNumber = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtCustomer = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.lblCustomer = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtPhoneNumber = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.lblPhoneNumber = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.line1 = new GrapeCity.ActiveReports.SectionReportModel.Line();
            this.line2 = new GrapeCity.ActiveReports.SectionReportModel.Line();
            this.lblPersonTakingOrder = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblPickupDateTime = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblPaymentTerms = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblNumberGuests = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.lblOccasion = new GrapeCity.ActiveReports.SectionReportModel.Label();
            this.txtPersonTakingOrder = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtPickupDate = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtPaymentTerms = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtNumberGuests = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.txtOccasion = new GrapeCity.ActiveReports.SectionReportModel.TextBox();
            this.line3 = new GrapeCity.ActiveReports.SectionReportModel.Line();
            this.line4 = new GrapeCity.ActiveReports.SectionReportModel.Line();
            this.line5 = new GrapeCity.ActiveReports.SectionReportModel.Line();
            this.line6 = new GrapeCity.ActiveReports.SectionReportModel.Line();
            this.line7 = new GrapeCity.ActiveReports.SectionReportModel.Line();
            ((System.ComponentModel.ISupportInitialize)(this.picLogo)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblTitle)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtDate)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtInvoiceNumber)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.label1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblInvoiceNumber)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtCustomer)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblCustomer)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPhoneNumber)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPhoneNumber)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPersonTakingOrder)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPickupDateTime)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPaymentTerms)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblNumberGuests)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblOccasion)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPersonTakingOrder)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPickupDate)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPaymentTerms)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtNumberGuests)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtOccasion)).BeginInit();
            // 
            // pageHeader
            // 
            this.pageHeader.Height = 0F;
            this.pageHeader.Name = "pageHeader";
            // 
            // detail
            // 
            this.detail.Name = "detail";
            // 
            // pageFooter
            // 
            this.pageFooter.Name = "pageFooter";
            // 
            // reportHeader
            // 
            this.reportHeader.Controls.AddRange(new GrapeCity.ActiveReports.SectionReportModel.ARControl[] {
            this.txtOccasion,
            this.txtNumberGuests,
            this.txtPaymentTerms,
            this.txtPickupDate,
            this.txtPersonTakingOrder,
            this.picLogo,
            this.lblTitle,
            this.txtDate,
            this.txtInvoiceNumber,
            this.label1,
            this.lblInvoiceNumber,
            this.txtCustomer,
            this.lblCustomer,
            this.txtPhoneNumber,
            this.lblPhoneNumber,
            this.line2,
            this.lblPersonTakingOrder,
            this.lblPickupDateTime,
            this.lblPaymentTerms,
            this.lblNumberGuests,
            this.lblOccasion,
            this.line1,
            this.line3,
            this.line4,
            this.line5,
            this.line6,
            this.line7});
            this.reportHeader.Height = 3.3125F;
            this.reportHeader.Name = "reportHeader";
            this.reportHeader.Format += new System.EventHandler(this.OnReportHeaderFormat);
            // 
            // reportFooter1
            // 
            this.reportFooter1.Name = "reportFooter1";
            // 
            // picLogo
            // 
            this.picLogo.Height = 1.75F;
            this.picLogo.ImageData = ((System.IO.Stream)(resources.GetObject("picLogo.ImageData")));
            this.picLogo.Left = 0.02083333F;
            this.picLogo.Name = "picLogo";
            this.picLogo.SizeMode = GrapeCity.ActiveReports.SectionReportModel.SizeModes.Zoom;
            this.picLogo.Top = 0.02083333F;
            this.picLogo.Width = 3.25F;
            // 
            // lblTitle
            // 
            this.lblTitle.Height = 1F;
            this.lblTitle.HyperLink = null;
            this.lblTitle.Left = 3.25F;
            this.lblTitle.Name = "lblTitle";
            this.lblTitle.Style = "color: DarkGray; font-family: Century Gothic; font-size: 24pt; text-align: center" +
    "";
            this.lblTitle.Text = "INVOICE:\r\nDining & Catering";
            this.lblTitle.Top = 0F;
            this.lblTitle.Width = 3.5F;
            // 
            // txtDate
            // 
            this.txtDate.Height = 0.25F;
            this.txtDate.Left = 5F;
            this.txtDate.Name = "txtDate";
            this.txtDate.OutputFormat = resources.GetString("txtDate.OutputFormat");
            this.txtDate.Style = "font-family: Century Gothic; text-align: left";
            this.txtDate.Text = "Date";
            this.txtDate.Top = 1.146F;
            this.txtDate.Width = 1.5F;
            // 
            // txtInvoiceNumber
            // 
            this.txtInvoiceNumber.Height = 0.25F;
            this.txtInvoiceNumber.Left = 5F;
            this.txtInvoiceNumber.Name = "txtInvoiceNumber";
            this.txtInvoiceNumber.OutputFormat = resources.GetString("txtInvoiceNumber.OutputFormat");
            this.txtInvoiceNumber.Style = "font-family: Century Gothic; text-align: left";
            this.txtInvoiceNumber.Text = "Invoice #";
            this.txtInvoiceNumber.Top = 1.521F;
            this.txtInvoiceNumber.Width = 1.5F;
            // 
            // label1
            // 
            this.label1.Height = 0.25F;
            this.label1.HyperLink = null;
            this.label1.Left = 4F;
            this.label1.Name = "label1";
            this.label1.Style = "font-family: Century Gothic; text-align: right";
            this.label1.Text = "Date:";
            this.label1.Top = 1.146F;
            this.label1.Width = 1F;
            // 
            // lblInvoiceNumber
            // 
            this.lblInvoiceNumber.Height = 0.25F;
            this.lblInvoiceNumber.HyperLink = null;
            this.lblInvoiceNumber.Left = 4F;
            this.lblInvoiceNumber.Name = "lblInvoiceNumber";
            this.lblInvoiceNumber.Style = "font-family: Century Gothic; text-align: right";
            this.lblInvoiceNumber.Text = "Form #:";
            this.lblInvoiceNumber.Top = 1.521F;
            this.lblInvoiceNumber.Width = 1F;
            // 
            // txtCustomer
            // 
            this.txtCustomer.Height = 0.25F;
            this.txtCustomer.Left = 1.5F;
            this.txtCustomer.Name = "txtCustomer";
            this.txtCustomer.OutputFormat = resources.GetString("txtCustomer.OutputFormat");
            this.txtCustomer.Style = "font-family: Century Gothic; text-align: left";
            this.txtCustomer.Text = "Customer";
            this.txtCustomer.Top = 2F;
            this.txtCustomer.Width = 1.5F;
            // 
            // lblCustomer
            // 
            this.lblCustomer.Height = 0.25F;
            this.lblCustomer.HyperLink = null;
            this.lblCustomer.Left = 0F;
            this.lblCustomer.Name = "lblCustomer";
            this.lblCustomer.Style = "font-family: Century Gothic; text-align: right";
            this.lblCustomer.Text = "Customer Name:";
            this.lblCustomer.Top = 2F;
            this.lblCustomer.Width = 1.5F;
            // 
            // txtPhoneNumber
            // 
            this.txtPhoneNumber.Height = 0.25F;
            this.txtPhoneNumber.Left = 1.5F;
            this.txtPhoneNumber.Name = "txtPhoneNumber";
            this.txtPhoneNumber.OutputFormat = resources.GetString("txtPhoneNumber.OutputFormat");
            this.txtPhoneNumber.Style = "font-family: Century Gothic; text-align: left";
            this.txtPhoneNumber.Text = "Phone";
            this.txtPhoneNumber.Top = 2.25F;
            this.txtPhoneNumber.Width = 1.5F;
            // 
            // lblPhoneNumber
            // 
            this.lblPhoneNumber.Height = 0.25F;
            this.lblPhoneNumber.HyperLink = null;
            this.lblPhoneNumber.Left = 0F;
            this.lblPhoneNumber.Name = "lblPhoneNumber";
            this.lblPhoneNumber.Style = "font-family: Century Gothic; text-align: right";
            this.lblPhoneNumber.Text = "Phone Number:";
            this.lblPhoneNumber.Top = 2.25F;
            this.lblPhoneNumber.Width = 1.5F;
            // 
            // line1
            // 
            this.line1.Height = 0F;
            this.line1.Left = 0F;
            this.line1.LineWeight = 1F;
            this.line1.Name = "line1";
            this.line1.Top = 3F;
            this.line1.Width = 6.5F;
            this.line1.X1 = 0F;
            this.line1.X2 = 6.5F;
            this.line1.Y1 = 3F;
            this.line1.Y2 = 3F;
            // 
            // line2
            // 
            this.line2.Height = 0F;
            this.line2.Left = 0F;
            this.line2.LineWeight = 1F;
            this.line2.Name = "line2";
            this.line2.Top = 3.25F;
            this.line2.Width = 6.5F;
            this.line2.X1 = 0F;
            this.line2.X2 = 6.5F;
            this.line2.Y1 = 3.25F;
            this.line2.Y2 = 3.25F;
            // 
            // lblPersonTakingOrder
            // 
            this.lblPersonTakingOrder.Height = 0.25F;
            this.lblPersonTakingOrder.HyperLink = null;
            this.lblPersonTakingOrder.Left = 0F;
            this.lblPersonTakingOrder.Name = "lblPersonTakingOrder";
            this.lblPersonTakingOrder.Style = "font-family: Century Gothic; font-size: 8pt; text-align: left";
            this.lblPersonTakingOrder.Text = "Person taking order";
            this.lblPersonTakingOrder.Top = 2.75F;
            this.lblPersonTakingOrder.Width = 1.3F;
            // 
            // lblPickupDateTime
            // 
            this.lblPickupDateTime.Height = 0.25F;
            this.lblPickupDateTime.HyperLink = null;
            this.lblPickupDateTime.Left = 1.3F;
            this.lblPickupDateTime.Name = "lblPickupDateTime";
            this.lblPickupDateTime.Style = "font-family: Century Gothic; font-size: 8pt; text-align: left";
            this.lblPickupDateTime.Text = "Pick-up Date, Time";
            this.lblPickupDateTime.Top = 2.75F;
            this.lblPickupDateTime.Width = 1.3F;
            // 
            // lblPaymentTerms
            // 
            this.lblPaymentTerms.Height = 0.25F;
            this.lblPaymentTerms.HyperLink = null;
            this.lblPaymentTerms.Left = 2.6F;
            this.lblPaymentTerms.Name = "lblPaymentTerms";
            this.lblPaymentTerms.Style = "font-family: Century Gothic; font-size: 8pt; text-align: left";
            this.lblPaymentTerms.Text = "Payment Terms";
            this.lblPaymentTerms.Top = 2.75F;
            this.lblPaymentTerms.Width = 1F;
            // 
            // lblNumberGuests
            // 
            this.lblNumberGuests.Height = 0.25F;
            this.lblNumberGuests.HyperLink = null;
            this.lblNumberGuests.Left = 3.6F;
            this.lblNumberGuests.Name = "lblNumberGuests";
            this.lblNumberGuests.Style = "font-family: Century Gothic; font-size: 8pt; text-align: left";
            this.lblNumberGuests.Text = "# of Guests";
            this.lblNumberGuests.Top = 2.75F;
            this.lblNumberGuests.Width = 1F;
            // 
            // lblOccasion
            // 
            this.lblOccasion.Height = 0.25F;
            this.lblOccasion.HyperLink = null;
            this.lblOccasion.Left = 4.6F;
            this.lblOccasion.Name = "lblOccasion";
            this.lblOccasion.Style = "font-family: Century Gothic; font-size: 8pt; text-align: left";
            this.lblOccasion.Text = "Occasion";
            this.lblOccasion.Top = 2.75F;
            this.lblOccasion.Width = 1.9F;
            // 
            // txtPersonTakingOrder
            // 
            this.txtPersonTakingOrder.Height = 0.25F;
            this.txtPersonTakingOrder.Left = 0F;
            this.txtPersonTakingOrder.Name = "txtPersonTakingOrder";
            this.txtPersonTakingOrder.Style = "font-family: Century Gothic; font-size: 8pt";
            this.txtPersonTakingOrder.Text = "Person";
            this.txtPersonTakingOrder.Top = 3F;
            this.txtPersonTakingOrder.Width = 1.3F;
            // 
            // txtPickupDate
            // 
            this.txtPickupDate.Height = 0.25F;
            this.txtPickupDate.Left = 1.3F;
            this.txtPickupDate.Name = "txtPickupDate";
            this.txtPickupDate.Style = "font-family: Century Gothic; font-size: 8pt";
            this.txtPickupDate.Text = "Date / Time";
            this.txtPickupDate.Top = 3F;
            this.txtPickupDate.Width = 1.3F;
            // 
            // txtPaymentTerms
            // 
            this.txtPaymentTerms.Height = 0.25F;
            this.txtPaymentTerms.Left = 2.6F;
            this.txtPaymentTerms.Name = "txtPaymentTerms";
            this.txtPaymentTerms.Style = "font-family: Century Gothic; font-size: 8pt";
            this.txtPaymentTerms.Text = "Due upon receipt";
            this.txtPaymentTerms.Top = 3F;
            this.txtPaymentTerms.Width = 1F;
            // 
            // txtNumberGuests
            // 
            this.txtNumberGuests.Height = 0.25F;
            this.txtNumberGuests.Left = 3.6F;
            this.txtNumberGuests.Name = "txtNumberGuests";
            this.txtNumberGuests.Style = "font-family: Century Gothic; font-size: 8pt";
            this.txtNumberGuests.Text = "Guests";
            this.txtNumberGuests.Top = 3F;
            this.txtNumberGuests.Width = 1F;
            // 
            // txtOccasion
            // 
            this.txtOccasion.Height = 0.25F;
            this.txtOccasion.Left = 4.6F;
            this.txtOccasion.Name = "txtOccasion";
            this.txtOccasion.Style = "font-family: Century Gothic; font-size: 8pt";
            this.txtOccasion.Text = "Occasion";
            this.txtOccasion.Top = 3F;
            this.txtOccasion.Width = 1.9F;
            // 
            // line3
            // 
            this.line3.Height = 0.25F;
            this.line3.Left = 1.3F;
            this.line3.LineWeight = 1F;
            this.line3.Name = "line3";
            this.line3.Top = 3F;
            this.line3.Width = 0F;
            this.line3.X1 = 1.3F;
            this.line3.X2 = 1.3F;
            this.line3.Y1 = 3F;
            this.line3.Y2 = 3.25F;
            // 
            // line4
            // 
            this.line4.Height = 0.25F;
            this.line4.Left = 2.6F;
            this.line4.LineWeight = 1F;
            this.line4.Name = "line4";
            this.line4.Top = 3F;
            this.line4.Width = 0F;
            this.line4.X1 = 2.6F;
            this.line4.X2 = 2.6F;
            this.line4.Y1 = 3F;
            this.line4.Y2 = 3.25F;
            // 
            // line5
            // 
            this.line5.Height = 0.25F;
            this.line5.Left = 3.6F;
            this.line5.LineWeight = 1F;
            this.line5.Name = "line5";
            this.line5.Top = 3F;
            this.line5.Width = 0F;
            this.line5.X1 = 3.6F;
            this.line5.X2 = 3.6F;
            this.line5.Y1 = 3F;
            this.line5.Y2 = 3.25F;
            // 
            // line6
            // 
            this.line6.Height = 0.25F;
            this.line6.Left = 4.6F;
            this.line6.LineWeight = 1F;
            this.line6.Name = "line6";
            this.line6.Top = 3F;
            this.line6.Width = 0F;
            this.line6.X1 = 4.6F;
            this.line6.X2 = 4.6F;
            this.line6.Y1 = 3F;
            this.line6.Y2 = 3.25F;
            // 
            // line7
            // 
            this.line7.Height = 0.25F;
            this.line7.Left = 6.5F;
            this.line7.LineWeight = 1F;
            this.line7.Name = "line7";
            this.line7.Top = 3F;
            this.line7.Width = 0F;
            this.line7.X1 = 6.5F;
            this.line7.X2 = 6.5F;
            this.line7.Y1 = 3F;
            this.line7.Y2 = 3.25F;
            // 
            // InvoiceReport
            // 
            this.PageSettings.PaperHeight = 11F;
            this.MasterReport = false;
            this.PageSettings.PaperWidth = 8.5F;
            this.Sections.Add(this.reportHeader);
            this.Sections.Add(this.pageHeader);
            this.Sections.Add(this.detail);
            this.Sections.Add(this.pageFooter);
            this.Sections.Add(this.reportFooter1);
            this.StyleSheet.Add(new DDCssLib.StyleSheetRule("font-family: Arial; font-style: normal; text-decoration: none; font-weight: norma" +
            "l; font-size: 10pt; color: Black", "Normal"));
            this.StyleSheet.Add(new DDCssLib.StyleSheetRule("font-size: 16pt; font-weight: bold", "Heading1", "Normal"));
            this.StyleSheet.Add(new DDCssLib.StyleSheetRule("font-family: Times New Roman; font-size: 14pt; font-weight: bold; font-style: ita" +
            "lic", "Heading2", "Normal"));
            this.StyleSheet.Add(new DDCssLib.StyleSheetRule("font-size: 13pt; font-weight: bold", "Heading3", "Normal"));
            ((System.ComponentModel.ISupportInitialize)(this.picLogo)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblTitle)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtDate)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtInvoiceNumber)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.label1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblInvoiceNumber)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtCustomer)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblCustomer)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPhoneNumber)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPhoneNumber)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPersonTakingOrder)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPickupDateTime)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPaymentTerms)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblNumberGuests)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblOccasion)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPersonTakingOrder)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPickupDate)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPaymentTerms)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtNumberGuests)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtOccasion)).EndInit();

        }
        #endregion

        private GrapeCity.ActiveReports.SectionReportModel.ReportHeader reportHeader;
        private GrapeCity.ActiveReports.SectionReportModel.ReportFooter reportFooter1;
        private GrapeCity.ActiveReports.SectionReportModel.Picture picLogo;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblTitle;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtDate;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtInvoiceNumber;
        private GrapeCity.ActiveReports.SectionReportModel.Label label1;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblInvoiceNumber;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtCustomer;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblCustomer;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtPhoneNumber;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblPhoneNumber;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtOccasion;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtNumberGuests;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtPaymentTerms;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtPickupDate;
        private GrapeCity.ActiveReports.SectionReportModel.TextBox txtPersonTakingOrder;
        private GrapeCity.ActiveReports.SectionReportModel.Line line2;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblPersonTakingOrder;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblPickupDateTime;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblPaymentTerms;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblNumberGuests;
        private GrapeCity.ActiveReports.SectionReportModel.Label lblOccasion;
        private GrapeCity.ActiveReports.SectionReportModel.Line line1;
        private GrapeCity.ActiveReports.SectionReportModel.Line line3;
        private GrapeCity.ActiveReports.SectionReportModel.Line line4;
        private GrapeCity.ActiveReports.SectionReportModel.Line line5;
        private GrapeCity.ActiveReports.SectionReportModel.Line line6;
        private GrapeCity.ActiveReports.SectionReportModel.Line line7;
    }
}
