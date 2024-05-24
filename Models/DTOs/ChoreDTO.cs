
namespace HouseRules.Models.DTOs;
using System.ComponentModel.DataAnnotations;

public class ChoreDTO
{
    public int Id { get; set; }

    [MaxLength(100, ErrorMessage = "Chore names must be 100 characters or less")]
    public string Name { get; set; }

    [Range(1, 10)]
    public int Difficulty { get; set; }
    [Range(1, 30)]
    public int ChoreFrequencyDays { get; set; }

    public List<ChoreCompletionDTO>? ChoreCompletions { get; set; }
    public List<ChoreAssignmentDTO> ChoreAssignments { get; set; }

    public bool Overdue
    {
        get
        {
            if (ChoreCompletions == null || !ChoreCompletions.Any())
            {
                return false;
            }

            var mostRecentCompletionDate = ChoreCompletions.Max(cc => cc.CompletedOn);
            var nextDueDate = mostRecentCompletionDate.AddDays(ChoreFrequencyDays).Date;
            return nextDueDate < DateTime.Today;
        }
    }


}