import { useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { dbService } from '../firebase';
import { useEffect } from 'react';

function CommentCollection({ userObj }) {
  const [myComments, setMyComments] = useState([]);

  useEffect(() => {
    //원하는 정렬이 있을 경우에는 파이어베이스에서 색인 추가 반드시 필요!
    if (userObj !== null) {
      const q = query(
        collection(dbService, 'starRangeInDB'),
        where('creatorId', '==', userObj.uid),
        orderBy('createdAt', 'desc')
      );
      onSnapshot(q, (qSnapshot) => {
        const myCommentsList = qSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMyComments(myCommentsList);
      });
    }
    console.log('로딩중');
  }, [userObj]);
  console.log(myComments);
}

export default CommentCollection;
