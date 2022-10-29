import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const findContact = contacts.find((contact) => contact.id === contactId);
    if (!findContact) {
      throw new Error(`Id:${findContact} not found`);
    }
    return findContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filterContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (contacts.length === filterContacts.length) {
      throw new Error(`ID:${contactId} is absent`);
    }
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts), "utf8");
    console.log(`contact with ID:${contactId} has been removed`);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contactsList = JSON.stringify([newContact, ...contacts], null, "\t");
    await fs.writeFile(contactsPath, contactsList, "utf8");
    // console.log("You have added a new contact");
  } catch (error) {
    console.log(error.message);
  }
}
export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
