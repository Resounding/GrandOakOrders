using System;
using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Models
{
    public class CalendarEvent
    {
        public string id { get; set; }
        public string title { get; set; }
        public string start { get; set; }
        public bool allDay { get; set; }
        public string url { get; set; }
        public string className { get; set; }
        public Inquiry Inquiry { get; set; }
    }
}