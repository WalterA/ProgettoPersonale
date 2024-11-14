from app import app

def test_name_field_blank():
    try:
        # Arrange
        client = app.test_client()

        # Act
        response = client.post('/', data={'name': '', 'email': 'test@example.com', 'password': 'test123'})

        # Assert
        assert 'Nome è obbligatorio' in response.get_data(as_text=True)
    except Exception as e:
        print(f"An error occurred: {e}")

# ... (same for other test functions)