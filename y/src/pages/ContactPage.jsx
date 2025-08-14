import React from 'react';

function ContactPage() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md my-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">যোগাযোগ করুন</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Information */}
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold">ঠিকানা:</h3>
            <p>১২৩/ক, শিক্ষা সরণি, চট্টগ্রাম, বাংলাদেশ</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">ফোন:</h3>
            <p>+৮৮০ ১২৩৪-৫৬৭৮৯০</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">ইমেইল:</h3>
            <p>info@yourcoaching.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="আপনার নাম"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="আপনার ইমেইল"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <textarea
              placeholder="আপনার বার্তা"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700"
            >
              বার্তা পাঠান
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
