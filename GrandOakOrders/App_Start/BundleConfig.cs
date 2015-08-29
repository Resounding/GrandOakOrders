﻿using System.Web.Optimization;
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
            jsBundle.Include("~/Scripts/jquery-2.1.1.js");
            jsBundle.Include("~/Scripts/materialize/materialize.js");
            jsBundle.Include("~/Scripts/moment.js");
            jsBundle.Include("~/jspm_packages/system.js");
            bundles.Add(jsBundle);
        }
    }
}