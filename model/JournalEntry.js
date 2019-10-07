import {types} from 'mobx-state-tree';

const JournalEntry= types.model('Entries',{
    date:types.string,
    data:types.model({name:types.string,height:types.string})
})

const Journal= types.model('Entries',{
    JournalEntries:types.array(JournalEntry)
})
.actions(self=>({
    addEntry(entry){
        self.JournalEntries.push(entry);
    }
})
)
.create({
    JournalEntries:[{date:'3434',data:{name:'sampJE',height:'60'}}]
})

export default Journal;