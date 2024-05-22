using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HouseRules.Data;
using HouseRules.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using HouseRules.Models;
using Microsoft.AspNetCore.Identity;
using System.Reflection.Metadata.Ecma335;


namespace HouseRules.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChoreController : ControllerBase
{
    private HouseRulesDbContext _dbContext;

    public ChoreController(HouseRulesDbContext context)
    {
        _dbContext = context;
    }

    //This endpoint will return all chores
    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Chore
            .Select(c => new ChoreDTO
            {
                Id = c.Id,
                Name = c.Name,
                Difficulty = c.Difficulty,
                ChoreFrequencyDays = c.ChoreFrequencyDays
            })
            .ToList());
    }

    //This endpoint will return a chore with the current assignees 
    //and all completions (you do not need to include each UserProfile that did the completion)

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        Chore chore = _dbContext.Chore
        .Include(c => c.ChoreAssignments).ThenInclude(ca => ca.UserProfile)
        .Include(c => c.ChoreCompletions)
        .SingleOrDefault(c => c.Id == id);

        if (chore == null)
        {
            return NotFound();
        }

        return Ok(new ChoreDTO
        {
            Id = chore.Id,
            Name = chore.Name,
            Difficulty = chore.Difficulty,
            ChoreFrequencyDays = chore.ChoreFrequencyDays,
            ChoreAssignments = chore.ChoreAssignments.Select(ca => new ChoreAssignmentDTO
            {
                Id = ca.Chore.Id,
                UserProfileId = ca.UserProfileId,
                UserProfile = new UserProfileDTO
                {
                    Id = ca.UserProfile.Id,
                    FirstName = ca.UserProfile.FirstName,
                    LastName = ca.UserProfile.LastName,
                    Address = ca.UserProfile.Address,
                    UserName = ca.UserProfile.UserName,
                    Email = ca.UserProfile.Email
                },
                ChoreId = ca.ChoreId
            }).ToList(),
            ChoreCompletions = chore.ChoreCompletions.Select(cc => new ChoreCompletionDTO
            {
                Id = cc.Id,
                UserProfileId = cc.UserProfileId,
                ChoreId = cc.ChoreId,
                CompletedOn = cc.CompletedOn
            }).ToList()
        });
    }

    //POST /api/chore/{id}/complete
    //This endpoint will create a new ChoreCompletion.
    //Use a query string parameter to indicate the userId that will be assigned 
    //to the chore matching the id in the URL.
    //Set the CompletedOn property in the controller method so that the client doesn't have to pass it in.
    //This endpoint can return a 204 No Content response once it has created the completion.

    [HttpPost("{id}/complete")]
    [Authorize]
    public IActionResult CompleteChore(int id, [FromQuery] int userId)
    {
        Chore chore = _dbContext.Chore.SingleOrDefault(c => c.Id == id);

        if (chore == null)
        {
            return NotFound();
        }

        // Find the user by the given userId
        UserProfile user = _dbContext.UserProfiles.SingleOrDefault(u => u.Id == userId);

        if (user == null)
        {
            return NotFound();
        }

        var choreCompletion = new ChoreCompletion
        {
            ChoreId = id,
            UserProfileId = userId,
            CompletedOn = DateTime.Now
        };

        _dbContext.ChoreCompletion.Add(choreCompletion);

        _dbContext.SaveChanges();

        return NoContent();
    }

    //POST /api/chore
    //available to admin users only
    //Post a new chore to be created
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult ChoreCreate(Chore choreToAdd)
    {

        if (choreToAdd == null)
        {
            return BadRequest();
        }
        _dbContext.Chore.Add(choreToAdd);

        _dbContext.SaveChanges();

        return NoContent();
    }

    //PUT /api/chore/{id}
    //This endpoint should allow updating all of the columns of the Chore table (except Id)

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult UpdateChore(Chore chore, int id)
    {
        Chore choreToUpdate = _dbContext.Chore.SingleOrDefault(c => c.Id == id);
        if (choreToUpdate == null)
        {
            return NotFound();
        }
        else if (id != choreToUpdate.Id)
        {
            return BadRequest();
        }

        choreToUpdate.Name = chore.Name;
        choreToUpdate.Difficulty = chore.Difficulty;
        choreToUpdate.ChoreFrequencyDays = chore.ChoreFrequencyDays;


        _dbContext.SaveChanges();

        return NoContent();
    }

    //DELETE /api/chore/{id}
    //This endpoint will delete a chore with the matching id

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteChore(int id)
    {
        Chore choreToDelete = _dbContext.Chore.SingleOrDefault(c => c.Id == id);

        if (choreToDelete == null)
        {
            return NotFound("chore not found");
        }

        _dbContext.Chore.Remove(choreToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }

    //POST /api/chore/{id}/assign
    //This endpoint will assign a chore to a user.
    //Pass the userId in as a query string param, as in the completion endpoint above.
    //This endpoint can return a 204 response.

    [HttpPost("{id}/assign")]
    [Authorize(Roles = "Admin")]
    public IActionResult AssignChore(int id, [FromQuery] int userId)
    {
        Chore choreToAssign = _dbContext.Chore.SingleOrDefault(c => c.Id == id);

        if (choreToAssign == null)
        {
            return NotFound("chore not found");
        }

        UserProfile userToAssign = _dbContext.UserProfiles.SingleOrDefault(u => u.Id == userId);

        if (userToAssign == null)
        {
            return NotFound("user not found");
        }

        var choreAssignment = new ChoreAssignment
        {
            ChoreId = id,
            UserProfileId = userId,

        };
        _dbContext.ChoreAssignment.Add(choreAssignment);

        _dbContext.SaveChanges();

        return NoContent();
    }



    [HttpDelete("{id}/unassign")]
    [Authorize(Roles = "Admin")]
    public IActionResult unassignChore(int id, [FromQuery] int userId)
    {
       
         ChoreAssignment choreToUnassign = _dbContext.ChoreAssignment.SingleOrDefault(ca => ca.UserProfileId == userId && ca.ChoreId == id);

         if (choreToUnassign == null)
         {
            return BadRequest("this assignment doesnt exist");
         }
;        
        _dbContext.ChoreAssignment.Remove(choreToUnassign);

        _dbContext.SaveChanges();

        return NoContent();
    }


}