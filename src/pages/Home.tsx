// Install necessary packages if not already installed
// npm install @ionic/react @ionic/react-router react-router react-router-dom axios

// src/App.tsx
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonLoading } from '@ionic/react';
import axios from 'axios';

interface UserData {
  name: {
    first: string;
    last: string;
  };
  email: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch 100 users from randomuser.me
    axios.get('https://randomuser.me/api/?results=100')
      .then(response => {
        setUsers(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      })
      .finally(() => {
        // Hide the loader once the response is fetched
        setLoading(false);
      });
  }, []);

  const handleRemoveUser = (index: number) => {
    // Remove the user at the specified index from the list
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);

    // Close the sliding item
    const slidingItems = document.querySelectorAll('ion-item-sliding');
    slidingItems.forEach((item: any) => item.close());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic React User List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonLoading isOpen={loading} message="Fetching users..." />

        <IonList>
          {users.map((user, index) => (
            <IonItemSliding key={index}>
              <IonItem>
                <IonLabel>
                  <h2>{`${user.name.first} ${user.name.last}`}</h2>
                  <p>{user.email}</p>
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => handleRemoveUser(index)}>
                  Remove
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default App;
