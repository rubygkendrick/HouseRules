using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HouseRules.Data;
using HouseRules.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using HouseRules.Models;
using Microsoft.AspNetCore.Identity;


namespace HouseRules.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private HouseRulesDbContext _dbContext;

    public UserProfileController(HouseRulesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .Select(up => new UserProfileDTO
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Address = up.Address,
                IdentityUserId = up.IdentityUserId,
                Email = up.IdentityUser.Email,
                UserName = up.IdentityUser.UserName
            })
            .ToList());
    }

    [HttpGet("withroles")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfileDTO
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Address = up.Address,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }));
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        UserProfile user = _dbContext.UserProfiles
        .Include(u => u.ChoreAssignments)
            .ThenInclude(ca => ca.Chore)
        .Include(u => u.ChoreCompletions)
            .ThenInclude(cc => cc.Chore)
        .SingleOrDefault(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(new UserProfileDTO
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Address = user.Address,
            Email = user.Email,
            UserName = user.UserName,
            ChoreAssignments = user.ChoreAssignments.Select(ca => new ChoreAssignmentDTO
            {
                Id = ca.Chore.Id,
                UserProfileId = ca.UserProfileId,
                ChoreId = ca.ChoreId
            }).ToList(),
            AssignedChores = user.ChoreAssignments.Select(ca => new ChoreDTO
            {
                Id = ca.Chore.Id,
                Name = ca.Chore.Name,
                Difficulty = ca.Chore.Difficulty,
                ChoreFrequencyDays = ca.Chore.ChoreFrequencyDays
            }).ToList(),
            CompletedChores = user.ChoreCompletions.Select(cc => new ChoreDTO
            {
                Id = cc.Chore.Id,
                Name = cc.Chore.Name,
                Difficulty = cc.Chore.Difficulty,
                ChoreFrequencyDays = cc.Chore.ChoreFrequencyDays,
                ChoreCompletions = cc.Chore.ChoreCompletions.Select(choreC => new ChoreCompletionDTO
                {
                    Id = choreC.Id,
                    CompletedOn = choreC.CompletedOn,
                    UserProfileId = choreC.UserProfileId,
                    ChoreId = choreC.ChoreId

                }).ToList()
            }).ToList()

        });
    }
}