﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Data.Repositories
{
    public class InquiryRepository
    {
        private GrandOakDbContext _context = new GrandOakDbContext();

        public async Task<List<Inquiry>> OpenInquiries()
        {
            var inquiries = await _context.Inquiries
                .Include(i => i.Outcome)
                .Where(i => i.OutcomeId == null || i.ConfirmationDate.HasValue && i.ConfirmationDate.Value > DateTime.Today)
                .OrderBy(i => i.UpdatedAt)
                .ToListAsync();

            return inquiries;
        }

        public async Task<Inquiry> GetOne(int id)
        {
            var inquiry = await _context.Inquiries
                .Include(i => i.Outcome)
                .FirstOrDefaultAsync(i => i.Id == id);

            return inquiry;
        }

        public async Task<Inquiry> Create(Inquiry inquiry, string who)
        {
            inquiry.CreatedAt = inquiry.UpdatedAt = DateTime.Now;
            inquiry.CreatedBy = inquiry.UpdatedBy = who;
            _context.Inquiries.Add(inquiry);
            await _context.SaveChangesAsync();

            return inquiry;
        }

        public async Task<Inquiry> Edit(Inquiry inquiry, string who)
        {
            
            var dbinquiry = await _context.Inquiries.FirstOrDefaultAsync(i => i.Id == inquiry.Id);
            if(dbinquiry == null) {
                return null;
            }

            dbinquiry.Organization = inquiry.Organization;
            dbinquiry.ContactPerson = inquiry.ContactPerson;
            dbinquiry.EventDate = inquiry.EventDate;
            dbinquiry.People = inquiry.People;
            dbinquiry.Summary = inquiry.Summary;
            dbinquiry.IsQuoteRequired = inquiry.IsQuoteRequired;
            dbinquiry.NeedsConfirmation = inquiry.NeedsConfirmation;
            dbinquiry.ConfirmationDate = inquiry.ConfirmationDate;
            dbinquiry.Description = inquiry.Description;
            dbinquiry.OutcomeId = inquiry.OutcomeId;
            dbinquiry.ClosureComments = inquiry.ClosureComments;
            dbinquiry.UpdatedAt = DateTime.Now;
            dbinquiry.UpdatedBy = who;
            await _context.SaveChangesAsync();

            return inquiry;
        }

        public async Task Delete(int id)
        {
            var inquiry = new Inquiry {
                Id = id
            };
            _context.Inquiries.Attach(inquiry);
            _context.Inquiries.Remove(inquiry);

            await _context.SaveChangesAsync();
        }

        public async Task Close(int id, string who)
        {
            var inquiry = await _context.Inquiries.FindAsync(id);
            if(inquiry != null) {
                inquiry.UpdatedAt = DateTime.Now;
                inquiry.UpdatedBy = who;
                inquiry.OutcomeId = InquiryOutcome.ClosedId;

                await _context.SaveChangesAsync();
            }
        }
    }
}