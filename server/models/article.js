const mongoose = require('mongoose');
const DATABASE_URI = process.env.DATABASE_URI;
mongoose.connect(DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);


const db = mongoose.connection;

db.once('open', () => {
    console.log('Database open success');
})

db.on('error', () => {
    console.log(err);
})

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

ArticleSchema.pre('validate', function (next) {
 
    if(this.title){
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
        this.slug =  "postID-" +this._id;

    }

    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }

    next();
})

module.exports = mongoose.model('Article', ArticleSchema);
