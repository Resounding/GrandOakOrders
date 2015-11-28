namespace GrandOakOrders.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ShowGratuity : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Orders", "ShowGratuity", c => c.Boolean(nullable: false, defaultValue: true));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Orders", "ShowGratuity");
        }
    }
}
