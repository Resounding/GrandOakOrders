using System.Web.Optimization;
using BundleTransformer.Core.Bundles;
using BundleTransformer.Core.Orderers;

namespace GrandOakOrders
{
    public static  class BundleConfig
    {
        public const string SiteStylesPath = "~/Bundles/Styles";
        public const string SiteScriptPath = "~/Bundles/Vendor";
        public const string AppScriptPath = "~/Bundles/App";

        public static void RegisterBundles(BundleCollection bundles) {
            var styleBundle = new CustomStyleBundle(SiteStylesPath);
            styleBundle.Orderer = new NullOrderer();
            styleBundle.Include("~/content/site.scss");
            bundles.Add(styleBundle);

            var jsBundle = new CustomScriptBundle(SiteScriptPath);
            jsBundle.Include("~/jspm_packages/github/components/jquery@3.1.0/jquery.js");
            jsBundle.Include("~/jspm_packages/npm/moment@2.14.1/moment.js");
            jsBundle.Include("~/jspm_packages/github/amsul/pickadate.js@3.5.6/lib/picker.js");
            jsBundle.Include("~/jspm_packages/github/amsul/pickadate.js@3.5.6/lib/picker.date.js");
            jsBundle.Include("~/jspm_packages/github/amsul/pickadate.js@3.5.6/lib/picker.time.js");
            jsBundle.Include("~/jspm_packages/npm/typeahead.js@0.11.1/dist/typeahead.jquery.js");
            jsBundle.Include("~/Scripts/handlebars-v4.0.4.js");
            jsBundle.Include("~/Scripts/materialize/materialize.js");
            jsBundle.Include("~/Scripts/fullcalendar.js");
            jsBundle.Include("~/Scripts/toastr.js");
            jsBundle.Include("~/jspm_packages/system.js");
            bundles.Add(jsBundle);
        }
    }
}