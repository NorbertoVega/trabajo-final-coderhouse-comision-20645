export class UserDTO {

    constructor(email, password, name, lastName, address, age, phoneNumber, urlAvatarImage) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.address = address;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.urlAvatarImage = urlAvatarImage;
        this.admin = false;
    }
}

