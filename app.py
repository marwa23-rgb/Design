# trimesh_test.py
import trimesh
import numpy as np

def create_simple_mesh():
    """
    Creates and validates a simple triangle mesh.
    """
    try:
        # Define vertices and faces for a simple triangle
        vertices = np.array([
            [0, 0, 0],
            [1, 0, 0],
            [0, 1, 0]
        ], dtype=float)

        faces = np.array([
            [0, 1, 2]
        ])

        # Create the mesh object
        mesh = trimesh.Trimesh(vertices=vertices, faces=faces)

        # Check if the mesh is valid
        if mesh.is_watertight:
            print("Trimesh is working correctly!")
            print(f"Number of vertices: {len(mesh.vertices)}")
            print(f"Number of faces: {len(mesh.faces)}")
        else:
            print("Trimesh created a non-watertight mesh. There might be an issue.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    create_simple_mesh()
