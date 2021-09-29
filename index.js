const contactsOperations = require("./contacts");
const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      try {
        const contacts = await contactsOperations.listContacts();
        console.table(contacts);
      }
      catch (error) {
        console.log(error.message);
      }
      break;

    case 'get':
      try {
        const contact = await contactsOperations.getContactById(id);
        if (!contact) {
          throw new Error(`There is no contact with id = ${id}`);
        }
        console.log(contact);
      }
      catch (error) {
        console.log(error.message);
      }
      break;

    case 'add':
      try {
        const newContact = await contactsOperations.addContact(name, email, phone);
        console.log(newContact);
      }
      catch (error) {
        console.log(error.message);
      }
      break;

    case 'remove':
      try {
        const contactRemoval = await contactsOperations.removeContact(id);
        if (!contactRemoval) {
          throw new Error(`There is no contact with id = ${id}`);
        }
        console.log('Contact successfully removed!');

      }
      catch (error) {
        console.log(error.message);
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);