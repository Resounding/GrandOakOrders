using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using GrapeCity.ActiveReports;
using GrapeCity.ActiveReports.Export.Word.Section;

namespace GrandOakOrders.Controllers.MediaFormatters
{
    public class WordDocumentReportMediaFormatter : ReportMediaFormatter
    {
        public WordDocumentReportMediaFormatter() : base("application/rtf")
        {
            MediaTypeMappings.Add(new QueryStringMapping("format", "rtf", new MediaTypeHeaderValue("application/rtf")));
        }

        public override void WriteToStream(Type type, object value, Stream writeStream, HttpContent content)
        {
            using (var writer = new StreamWriter(writeStream)) {
                var report = value as SectionReport;
                if (report != null) {
                    var memStream = new MemoryStream();
                    var rtfExport = new RtfExport();
                    rtfExport.Export(report.Document, memStream);
                    memStream.Position = 0;
                    writeStream.Write(memStream.ToArray(), 0, (int)memStream.Length);
                    content.Headers.ContentDisposition = new ContentDispositionHeaderValue("inline") { FileName = report.Name + ".rtf" };
                } else {
                    throw new InvalidOperationException("Cannot serialize type");
                }
            }
        }
    }
}