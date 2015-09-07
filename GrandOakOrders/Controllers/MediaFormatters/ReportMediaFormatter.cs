using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading;
using GrapeCity.ActiveReports;

namespace GrandOakOrders.Controllers.MediaFormatters
{
    public class ReportMediaFormatter : BufferedMediaTypeFormatter
    {
        public ReportMediaFormatter(params string[] formats)
        {
            foreach (var format in formats) {
                SupportedMediaTypes.Add(new MediaTypeHeaderValue(format));
            }
        }

        public override bool CanWriteType(Type type)
        {
            var report = typeof(SectionReport);
            var canWrite = report.IsAssignableFrom(type);
            return canWrite;
        }

        public override bool CanReadType(Type type)
        {
            return false;
        }

        public override void WriteToStream(Type type, object value, Stream writeStream, HttpContent content, CancellationToken cancellationToken)
        {
            WriteToStream(type, value, writeStream, content);
        }
    }
}