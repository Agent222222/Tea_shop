using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Data.SqlClient;

namespace AdmiPanel.Pages.Teas
{
    public class EditModel : PageModel
    {
		public TeaInfo TeaInfo = new TeaInfo();
		public string errorMessage = "";
		public string successMessage = "";

		public void OnGet()
        {
            string id = Request.Query["id"];

			try
			{
				string connectionString = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\maxko\\Source\\Repos\\Tea_shop\\Backend\\TeaShop\\AdmiPanel\\App_Data\\tea_items.mdf;Integrated Security=True;Connect Timeout=30";

				using (SqlConnection connection = new SqlConnection(connectionString))
				{
					connection.Open();
					string sql = "SELECT * FROM Teas WHERE id=@id";

					using (SqlCommand command = new SqlCommand(sql, connection))
					{
						command.Parameters.AddWithValue("@id", id);
						using (SqlDataReader reader = command.ExecuteReader())
						{
							if (reader.Read())
							{
								TeaInfo.Id = "" + reader.GetInt32(0);
								TeaInfo.Name = reader.GetString(1);
								TeaInfo.Description = reader.GetString(2);
								TeaInfo.Image = reader.GetString(3);
								TeaInfo.Price = reader.GetInt32(4).ToString();
								TeaInfo.SalePrice = reader.GetInt32(5).ToString();
							}
						}
					}
				}
			}
			catch (Exception ex)
			{
				errorMessage = ex.Message;
			}
        }

        public void OnPost() 
        {
			TeaInfo.Name = Request.Form["name"];
			TeaInfo.Description = Request.Form["description"];
			TeaInfo.Image = Request.Form["image"];
			TeaInfo.Price = Request.Form["price"];
			TeaInfo.SalePrice = Request.Form["salePrice"];

			if (TeaInfo.Name.Length == 0 ||
				TeaInfo.Description.Length == 0 ||
				TeaInfo.Image.Length == 0 ||
				TeaInfo.Price.Length == 0 ||
				TeaInfo.SalePrice.Length == 0)
			{
				errorMessage = "All the fields are required";
				return;
			}

			try
			{
				string connectionString = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\maxko\\Source\\Repos\\Tea_shop\\Backend\\TeaShop\\AdmiPanel\\App_Data\\tea_items.mdf;Integrated Security=True;Connect Timeout=30";

				using (SqlConnection connection = new SqlConnection(connectionString))
				{
					connection.Open();
					string sql = "UPDATE Teas " +
								 "SET name=@name, description=@description, image=@image, price=@price, salePrice=@salePrice " +
								 "WHERE id=@id";

					using (SqlCommand command = new SqlCommand(sql, connection))
					{
						command.Parameters.AddWithValue("@id", TeaInfo.Id);
						command.Parameters.AddWithValue("@name", TeaInfo.Name);
						command.Parameters.AddWithValue("@description", TeaInfo.Description);
						command.Parameters.AddWithValue("@image", TeaInfo.Image);
						command.Parameters.AddWithValue("@price", TeaInfo.Price);
						command.Parameters.AddWithValue("@salePrice", TeaInfo.SalePrice);
						command.ExecuteNonQuery();
					}
				}
			}
			catch (Exception ex)
			{
				errorMessage = ex.Message;
				return;
			}

			Response.Redirect("/Teas/Index");
		}
    }
}
