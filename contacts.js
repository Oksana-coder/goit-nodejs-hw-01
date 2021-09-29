const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => (contact.id).toString() === contactId);
  if (idx === -1) {
    return null;
  }
  return contacts[idx];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return true;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name: name, email: email, phone: phone, id: uuidv4() };
  const newContacts = [...contacts, newContact]
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}