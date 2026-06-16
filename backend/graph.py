import networkx as nx
import time

buildings = {

    "BuildingA": {
        "RoomA": ["Hall"],
        "Hall": ["Exit1", "Exit2"]
    },

    "BuildingB": {
        "Lab": ["Corridor"],
        "Corridor": ["Exit2"]
    }

}

def create_graph(building_name):

    G = nx.Graph()

    building = buildings[building_name]

    for node, neighbors in building.items():
        for neighbor in neighbors:
            G.add_edge(node, neighbor)

    return G

def get_path(building_name, start, end):

    G = create_graph(building_name)

    start_time = time.time()

    path = nx.shortest_path(G, start, end)

    dijkstra_time = round(
        (time.time() - start_time) * 1000,
        3
    )

    return path, dijkstra_time