using System.Net.Http.Formatting;
using GrandOakOrders.Controllers.MediaFormatters;

namespace GrandOakOrders
{
    public static class MediaFormattersConfig
    {
        public static void RegisterFormatters(MediaTypeFormatterCollection formatters)
        {
            formatters.Add(new PdfReportMediaFormatter());
            formatters.Add(new WordDocumentReportMediaFormatter());
        }
    }
}