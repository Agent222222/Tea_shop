using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Data.SqlClient;

namespace AdmiPanel.Pages.Teas
{
    public class IndexModel : PageModel
    {
        public List<TeaInfo> teas = new List<TeaInfo>();

        public void OnGet()
        {
            try
            {
                string connectionString = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\maxko\\Source\\Repos\\Tea_shop\\Backend\\TeaShop\\AdmiPanel\\App_Data\\tea_items.mdf;Integrated Security=True;Connect Timeout=30";

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    string sql = "SELECT * FROM Teas";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                TeaInfo teaInfo = new TeaInfo();
                                teaInfo.Id = "" + reader.GetInt32(0);
                                teaInfo.Name = reader.GetString(1);
                                teaInfo.Description = reader.GetString(2);
								teaInfo.Image = reader.GetString(3);
								teaInfo.Price = reader.GetInt32(4).ToString();
                                teaInfo.SalePrice = reader.GetInt32(5).ToString();
                                teaInfo.Created = reader.GetDateTime(6).ToString();

                                teas.Add(teaInfo);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exceprion: " + ex.ToString());
            }
        }
    }

    public class TeaInfo
    {
        public string Id;
        public string Name;
        public string Description;
        public string Image;
        public string Price;
        public string SalePrice;
        public string Created;
    }
}
