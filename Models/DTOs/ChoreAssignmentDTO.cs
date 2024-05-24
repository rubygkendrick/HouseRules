
namespace HouseRules.Models.DTOs;

public class ChoreAssignmentDTO
{
    public int Id { get; set; }

    public int UserProfileId { get; set; }
    public UserProfileDTO UserProfile { get; set; }

    public int ChoreId { get; set; }
    public ChoreDTO Chore { get; set; }

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
            else {
                return false;
            }

        }
    }

}