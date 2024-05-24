

namespace HouseRules.Models;

public class ChoreAssignment
{
    public int Id { get; set; }

    public int UserProfileId { get; set; }
    public UserProfile? UserProfile { get; set; }

    public int ChoreId { get; set; }
    public Chore? Chore { get; set; }
    public bool Overdue
    {
        get
        {
            if (Chore == null)
            {
                return false;
            }

            if (Chore.Overdue == true)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
    }

}