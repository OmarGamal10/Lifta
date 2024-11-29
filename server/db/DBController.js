const dbManager = require("./DBManager")


exports.SelectUserByEmail = async (email) => {

    const query = "SELECT * FROM lifta_schema.users WHERE email = $1";
    const values = [email];
    return await dbManager.executeReader(query, values);
}

exports.AddUser = async (values) => {

    const query = "INSERT INTO lifta_schema.users (email, first_name, last_name, password, gender, bio, phone_number)VAlUES($1, $2, $3, $4, $5, $6, $7)";
    
    try {
        await dbManager.executeNonQuery(query, values);
    } catch (error) {
        throw error;
    }
}