
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models.DTOs;

public class UserProfileDTO
{
    public int Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Address { get; set; }

    [MaxLength(50, ErrorMessage = "usernames must be 50 characters or less")]
    public string UserName { get; set; }
    public List<string> Roles { get; set; }

    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }

    public List<ChoreAssignmentDTO> ChoreAssignments {get; set;}

    public List<ChoreDTO> AssignedChores { get; set; }

    public List<ChoreDTO> CompletedChores { get; set; }
    public List<ChoreCompletionDTO> ChoreCompletions { get; set; }

    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string Email { get; set; }

}