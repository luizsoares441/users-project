using System.ComponentModel.DataAnnotations;

namespace UsersApi.DTOs
{
    public class CreateUserDto
    {
        [Required]
        [StringLength(100, ErrorMessage = "Name cannot be longer than 100 characters.")]
        public string Name { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }
        [Required]
        [StringLength(50, ErrorMessage = "Password cannot be longer than 50 characters.")]
        public string Password { get; set; }
    }
}
