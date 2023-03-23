const Ticket = require('../models/Ticket')

class MyDB {
    constructor() {
        this.tickets = [];
    }

    /**
     * create and save new ticket
     * @param {string} username 
     * @param {number} price 
     * @returns {Ticket} return a ticket object
     */
    create(username, price) {
        const ticket = new Ticket(username, price);
        this.tickets.push(ticket);
        return ticket;
    }

    /**
     * create multiple ticket for a single user
     * @param {string} username 
     * @param {number} price 
     * @param {Array<Ticket>} quantity 
     */
    bulkCreate(username, price, quantity) {
        const result = [];
        for (let i = 0; i < quantity; i++) {
            const ticket = this.create(username, price);
            result.push(ticket);
        }
        return result;
    }

    /**
     * return all available tickets
     */
    find() {
        return this.tickets;
    }

    /**
     * find ticket by ticket id
     * @param {string} ticketId
     * @returns {Ticket}
     */
    findById(ticketId) {
        const ticket = this.tickets.find(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.id === ticketId
        )
        return ticket;
    }

    /**
     * find all tickets for a given user
     * @param {string} username 
     * @returns {Array<Ticket>}
     */
    findByUsername(username) {
        const tickets = this.tickets.filter(
            /**
             * 
             * @param {Ticket} ticket 
             */
            (ticket) => ticket.username === username
        )
        return tickets;
    }

    /**
     * 
     * @param {string} ticketId 
     * @param {{ username: string, price: number }} ticketBody 
     */
    updateById(ticketId, ticketBody) {
        const ticket = this.findById(ticketId);
        ticket.username = ticketBody.username ?? ticket.username;
        ticket.price = ticketBody.price ?? ticket.price;
        ticket.updatedAt = new Date();
        return ticket;
    }


    /**
     * delete by Id
     * @param {string} ticketId 
     */
    deleteById(ticketId) {
        const index = this.tickets.findIndex((ticket) => ticket.id === ticketId);
        if (index) {
            this.tickets.splice(index, 1);
            return true
        } else {
            false
        }

    }

    /**
     * 
     * @param {*} winnerCount 
     * @returns {Array<Ticket>}
     */
    draw(winnerCount) {
        let winnerIndexes = new Array(winnerCount);
        let index = 0;
        while (index < winnerCount) {
            let winnerIndex = Math.floor(Math.random() * this.tickets.length);
            console.log("Index", winnerIndex);
            if (!winnerIndexes.includes(winnerIndex)) {
                winnerIndexes[index++] = winnerIndex;
                continue;
            }
        }
        // for (let i = 0; indexes.length; i++) {
        //     let index = Math.floor(Math.random() * this.tickets.length);
        //     while (indexes.includes(index)) {
        //         index = Math.floor(Math.random() * this.tickets.length);
        //     }
        //     indexes.push(index);
        // }
        const winners = winnerIndexes.map((index) => this.tickets[index]);
        return winners;
    }
}

const myDB = new MyDB();
module.exports = myDB;