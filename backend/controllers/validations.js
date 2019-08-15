const {body} = require("express-validator/check");
const { sanitizeBody } = require('express-validator');

exports.validate = (component)=>{
    switch(component) {
        case 'survey': {
            return [
                body('section1', 'the first section must be all lowercase..').isLowercase(),
               // body('section1', 'the first section must be all alphapeticals..').sanitizeBody(),
                body('section2', 'the second section must be all lowercase..').isLowercase(),
               // body('section2', 'the second section must be all letters or number..').sanitizeBody(),
                body('section3', 'the third section must be all lowercase..').isLowercase(),
               // body('section3', 'the third section must be all letters or number..').sanitizeBody(),
                body('section4', 'the fourth section must be all lowercase..').isLowercase(),
               // body('section4', 'the fourth section must be all letters or number..').sanitizeBody(),
                body('spec1', 'the first spec must be all lowercase..').isLowercase(),
                body('spec2', 'the second spec must be all lowercase..').isLowercase(),
                body('spec3', 'the third spec must be all lowercase..').isLowercase(),
                body('spec4', 'the fourth spec must be all lowercase..').isLowercase(),
                body('spec5', 'the fivth spec must be all lowercase..').isLowercase(),
            ];
        }
        case 'comment': {
            return [
                body('comment', 'add valid comment').isString()
            ]
        }

    }
    
}