using System.Collections.Generic;

namespace GrandOakOrders.Models
{
    public class GoogleProfileResponse
    {
        public List<GoogleProfileName> names { get; set; }
        public List<GoogleProfileEmailAddress> emailAddresses { get; set; }
    }

    public class GoogleMetadata
    {
        public bool primary { get; set; }
        public GoogleSource source { get; set; }
    }

    public class GoogleSource
    {
        public string type { get; set; }
        public string id { get; set; }
    }

    public class GoogleProfileName
    {
        public string displayName { get; set; }
        public GoogleMetadata metadata { get; set; }
    }

    public class GoogleProfileEmailAddress
    {
        public string value { get; set; }
        public GoogleMetadata metadata { get; set; }
    }
}