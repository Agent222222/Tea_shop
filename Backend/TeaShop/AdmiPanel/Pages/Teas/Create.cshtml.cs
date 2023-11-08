using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Data.SqlClient;

namespace AdmiPanel.Pages.Teas
{
    public class CreateModel : PageModel
    {
        public TeaInfo TeaInfo = new TeaInfo();
        public string errorMessage = "";
        public string successMessage = "";


		public void OnGet()
        {

        }

        public void OnPost() 
        {
            TeaInfo.Name = Request.Form["name"];
            TeaInfo.Description = Request.Form["description"];
            TeaInfo.Image = Request.Form["image"];
            TeaInfo.Price = Request.Form["price"];
            TeaInfo.SalePrice = Request.Form["salePrice"];
            TeaInfo.Created = DateTime.Now.ToString();

            if (TeaInfo.Name.Length == 0 || 
                TeaInfo.Description.Length == 0 ||
				TeaInfo.Image.Length == 0 ||
				TeaInfo.Price.Length == 0 ||
				TeaInfo.SalePrice.Length == 0)
            {
                errorMessage = "All the fields are required";
                return;
            }

            // save the new tea into the database

            try
            {
				string connectionString = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\maxko\\Source\\Repos\\Tea_shop\\Backend\\TeaShop\\AdmiPanel\\App_Data\\tea_items.mdf;Integrated Security=True;Connect Timeout=30";

				using (SqlConnection connection = new SqlConnection(connectionString))
				{
					connection.Open();
					string sql = "INSERT INTO Teas " +
                                 "(name, description, image, price, salePrice, created) VALUES" +
								 "(@name, @description, @image, @price, @salePrice, @created);";
					
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@name", TeaInfo.Name);
                        command.Parameters.AddWithValue("@description", TeaInfo.Description);
                        command.Parameters.AddWithValue("@image", TeaInfo.Image);
                        command.Parameters.AddWithValue("@price", TeaInfo.Price);
                        command.Parameters.AddWithValue("@salePrice", TeaInfo.SalePrice);
                        command.Parameters.AddWithValue("@created", TeaInfo.Created);
                        command.ExecuteNonQuery();
                    }
				}
			}
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                return;
			}

            TeaInfo.Name = "";
			TeaInfo.Description = "";
			TeaInfo.Image = "";
			TeaInfo.Price = "";
			TeaInfo.SalePrice = "";

			successMessage = "New Tea Added Correctly";
            Response.Redirect("/Teas/Index");
        }
    }
}
