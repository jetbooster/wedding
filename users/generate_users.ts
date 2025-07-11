import Database from "bun:sqlite";
import parse from "csv-simple-parser";

const thisFolder = import.meta.dir;

// random three letter lowercase code generator
const generateCode = () => {
  const letters = "abcdefghjklmnpqrstvwxyz";
  let code = "";
  for (let i = 0; i < 3; i++) {
    code += letters[Math.floor(Math.random() * letters.length)];
  }
  return code;
};

if (import.meta.path === Bun.main) {
  const db = new Database(`${thisFolder}/../db/db.sqlite`);
  Bun.file(`${thisFolder}/users_in.csv`)
    .text()
    .then(async (csvContent) => {
      const users = (
        parse(csvContent, {
          header: true,
        }) as { name: string; partner_name?: string; address?: string }[]
      ).map(({ name, partner_name, address }) => {
        return {
          $name: name,
          $code: generateCode(),
          $allowed_partner: partner_name ? 1 : 0,
          $partner_name: partner_name || "",
          $address: address || "",
        };
      });
      await Bun.write(
        `${thisFolder}/users_out.csv`,
        users
          .map(
            (user) =>
              `${user.$name},${user.$code},${user.$partner_name},"${user.$address}"`
          )
          .join("\n")
      );

      const insertUser = db.prepare(
        `INSERT INTO users (name,code,allowed_partner,partner_name,address) VALUES ($name,$code,$allowed_partner,$partner_name,$address);`
      );
      const insertUsers = db.transaction(
        (users: [string, string, number, string]) => {
          for (const user of users) insertUser.run(user);
        }
      );

      db.run(`DELETE FROM users;`);
      await insertUsers(users);

      console.log("Users generated successfully.");
    });
}
