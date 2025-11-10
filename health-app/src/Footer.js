import React from 'react';
import { Container } from 'react-bootstrap';

function AppFooter() {
  return (
    <footer className="bg-light text-center text-muted py-3 mt-auto border-top">
      <Container>
        <p className="mb-1">&copy; {new Date().getFullYear()} AI Health App. All rights reserved.</p>

      </Container>
    </footer>
  );
}

export default AppFooter;
